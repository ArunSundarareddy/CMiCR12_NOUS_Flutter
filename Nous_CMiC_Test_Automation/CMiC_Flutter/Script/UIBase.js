//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
Exists //Function that Confirms UI element exists
NotExists //Functions that Confirms UI element is not Present
Click //Function to click on UI object
ClickKey //Function to click on UI object using keystrokes [Enter]
Click_Wcoords //Function to click on UI object with Co-ordinates
WaitObjLoad //Function to wait for the UI object to load
//WaitObjLoad //Function to wait for the UI object to load - ignoring Enabled or Disabled
GetUIObject //Function to Get UI object
VisibleOnScreen //Function to Confirm UI element is visible on screen or not
Enabled //Function to Confirm UI element is enabled or not
DblClickOnUIObject //Function to double click on UI object
HoverOnUIObject //Function to Hover on UI object
RClickOnUIObject //Function to Right click on UI object
HoverOnUIObject_WOCoords //Function to Hover on UI object without Co-ordinates
Disabled //Function  to Confirm UI element is disabled or not
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Exists
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function that Confirms UI element exists
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Exists(strLogicalName,strLogTxt,strParent)
{
  try
  {
    var blnResult = false
    var Logger
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        strLogTxt = undefined; 
        Logger = false;
    }else Logger = true
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if((!(objUI == null) || !(objUI.Name == "Non-existent object")) && objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI); 
      blnResult = objUI.Exists;
      Log.Message("Object ["+ strMessage +"] Exists");
    }
    else
    {
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified")
    }
  }
  catch(err)
  {
    Log.Warning("Exception: Exists: "+err.message);
  }
  
  if(Logger==true)
  {
    writeLogline(strLogTxt,"Exists",strMessage,blnResult)
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : NotExists
Parameters          : strLogicalName - LogicalName(OR)
Description         : Functions that Confirms UI element is not Present
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function NotExists(strLogicalName,strLogTxt,strParent)
{ 
  try
  {
    var blnResult = false
    var Logger
    Log.Enabled = false; 
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        strLogTxt = undefined; 
        Logger = false;
    }else Logger = true

    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName
      objUI.RefreshMappingInfo() 
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    
      if(strParent != null)
      {
        var arrParent = strParent.split(";");
          if (arrParent.length != 0) {
            objCurrentPage = GetCurrentPageObject_WO_Validation();
          
            for (var p = 0; p < arrParent.length; p++) {
              if (typeof objParent !== "object" || p == 0) {
                objParent = objCurrentPage.WaitElement(arrParent[p]);
              } else {
                if(arrParent[p] != "ShadowRoot(0)") {
                  SubParent = objParent.WaitElement(arrParent[p]);
                }
                else {
                  SubParent = objParent.ShadowRoot(0)
                }
              
                if(SubParent.Exists)
                {
                  objParent = SubParent;
                }
              }
            }
            objUI = objParent.WaitElement(strLogicalName);
          }
      }
      else
      {
        objUI = GetCurrentPageObject_WO_Validation().WaitElement(strLogicalName);
      }  
    }
    
    if(objUI.Exists == false)
    {
      blnResult = true;
    }
    else
    {
      Log.Enabled = true;
      var strMessage = GetUIObjectDetails(objUI); 
      blnResult = false;
      Log.Warning("Object ["+ strMessage +"] Exists");
    }
    Log.Enabled = true;
  }
  catch(err)
  {
    Log.Warning("Exception: NotExists: "+err.message);
  }
  
  if(Logger==true)
  {
    writeLogline(strLogTxt,"NotExists",strMessage,blnResult);
  }
  return blnResult;
}


function NotExists_WOLog(strLogicalName,strParent)
{ 
  Log.Enabled = false;
  
  if(typeof strLogicalName === "object")
  {
    objUI = strLogicalName 
    objUI.RefreshMappingInfo()
  }
  else
  {
    if(strParent != null)
    {
      var arrParent = strParent.split(";");
        if (arrParent.length != 0) {
          objCurrentPage = GetCurrentPageObject_WO_Validation();
          
          for (var p = 0; p < arrParent.length; p++) {
            if (typeof objParent !== "object" || p == 0) {
              objParent = objCurrentPage.WaitElement(arrParent[p]);
            } else {
              if(arrParent[p] != "ShadowRoot(0)") {
                SubParent = objParent.WaitElement(arrParent[p]);
              }
              else {
                SubParent = objParent.ShadowRoot(0)
              }
              
              if(SubParent.Exists)
              {
                objParent = SubParent;
              }
            }
          }
          objUI = objParent.WaitElement(strLogicalName);
        }
    }
    else
    {
      objUI = GetCurrentPageObject_WO_Validation().WaitElement(strLogicalName);
    }  
  }

  Log.Enabled = true;
  
  if(objUI.Exists == false)
  {
    return true;
  }
  else
  {
    return false;
  }  
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Drag
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to click on UI object
Return Value        : True or False
Author              : Dhruv 
Creation Date       : 20-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Drag(strLogicalName,ClientX,ClientY,toX,toY,strLogTxt,bolScroll,strParent)
{
  try
  {
    var blnResult = false;
    var Logger
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        Logger = false;
    }else if(typeof bolScroll === 'undefined'){
      bolScroll = false;
      Logger = true;  
    }
    else if(typeof bolScroll !== 'boolean' && bolScroll.startsWith("//")){
        strParent = bolScroll 
        bolScroll = false;
        Logger = true
    }else Logger = true    
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI); 
      if(objUI.VisibleOnScreen == false)
      {     
        objUI.scrollIntoView(bolScroll);
        objUI.focus();
      }
      objUI.Drag(ClientX,ClientY,toX,toY);
      blnResult = true;
      Log.Message("Object ["+ strMessage +"] is Draged.");
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Drag "+err.message);
  }
	
  if(Logger==true)
	{	  
    writeLogline(strLogTxt,"Drag",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : ClickKey
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to click on UI object using keystrokes [Enter]
Return Value        : True or False
Author              : Arun 
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function ClickKey(strLogicalName,strLogTxt,bolScroll,strParent)
{
  try
  {
    var blnResult = false;
    var Logger
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        Logger = false;
    }else if(typeof bolScroll === 'undefined'){
      bolScroll = false;
      Logger = true;  
    }
    else if(typeof bolScroll !== 'boolean' && bolScroll.startsWith("//")){
        strParent = bolScroll 
        bolScroll = false;
        Logger = true
    }else Logger = true  
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }

    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI); 
      if(objUI.VisibleOnScreen == false)
      {   
        objUI.scrollIntoView(bolScroll);
        objUI.focus();
      }
      objUI.Keys("[Enter]")
      blnResult = true;
      Log.Message("Object ["+ strMessage +"] is clicked.");
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Click: "+err.message);
  }
  
  if(Logger==true)
	{	  
    writeLogline(strLogTxt,"Click",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Click_Wcoords
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to click on UI object with Co-ordinates
Return Value        : True or False
Author              : Arun 
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Click_Wcoords(strLogicalName,x,y,strLogTxt,bolScroll,strParent)
{
  try
  {
    var blnResult = false;
    var Logger
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        Logger = false;
    }else if(typeof bolScroll === 'undefined'){
      bolScroll = false;
      Logger = true;  
    }
    else if(typeof bolScroll !== 'boolean' && bolScroll.startsWith("//")){
        strParent = bolScroll 
        bolScroll = false;
        Logger = true
    }else Logger = true  

    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
        
    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI); 
      if(objUI.VisibleOnScreen == false)
      {   
        objUI.scrollIntoView(bolScroll);
        objUI.focus();
      }
      objUI.Click(x,y);
      blnResult = true;
      Log.Message("Object ["+ strMessage +"] is clicked.");
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Click: "+err.message);
  }
  
  if(Logger==true)
	{	  
    writeLogline(strLogTxt,"Click",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : WaitObjLoad
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to wait for the UI object to load
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function WaitObjLoad_OLD(strLogicalName,strParent)
{
  var iCount = 0;
  var PageTime;
  var ParentTime;
  var time;
  var objCurrentPage;
  Log.Enabled = false;
  
  if(typeof strLogicalName !== "string")
  {
    objUI = strLogicalName
    while(iCount<75)
    {
      objUI.RefreshMappingInfo()
      if(objUI.Exists == false)
      {
//        Delay(1,"Waiting for Object to Load");
        iCount = iCount+1;
      }
      else if(objUI.VisibleOnScreen == false)
      {
//        Delay(1,"Waiting for Object to Load");
        iCount = iCount+1;
        objUI.ScrollIntoView(false)
      }
      else
        break;
    } 
  }
  else
  {
    objUI = GetUIObject(strLogicalName,strParent)
          
    while(iCount<4)
    {
      if(objUI.Exists == false)
      {
//        Delay(1,"Waiting for Object to Load");
        iCount = iCount+1;
        objUI = GetUIObject(strLogicalName,strParent)
      }
      else if(objUI.VisibleOnScreen == false)
      {
//        Delay(1,"Waiting for Object to Load");
        iCount = iCount+1;
        objUI.ScrollIntoView(false);
      }
      else
        break;
    }
  }
  Log.Enabled = true;
}

function WaitObjLoad(strLogicalName, strParent) {
  var iCount = 0;
  var objUI;
  var maxWaitTime = new Date().getTime() + ProjectSuite.Variables.GlobalObjWaitTime; // currently set to 15 seconds in milliseconds
  var timePerCheck = 1; // 1 millisecond delay per check

  Log.Enabled = false;
  
  if (typeof strLogicalName !== "string") {
    objUI = strLogicalName;
    while (new Date().getTime() < maxWaitTime) { 
      objUI.RefreshMappingInfo();
      if (objUI.Exists == false) {
        Delay(timePerCheck, "Waiting for Object to Load");
      }
      else if (objUI.VisibleOnScreen == false) {
        objUI.ScrollIntoView(false);
        Delay(timePerCheck, "Waiting for Object to become Visible");
      }
      else {
        break;
      }
    }
  }
  else {
    objUI = GetUIObject(strLogicalName, strParent);
    while (new Date().getTime() < maxWaitTime) { 
      if (objUI.Exists == false) {
        objUI = GetUIObject(strLogicalName, strParent);
        Delay(timePerCheck, "Waiting for Object to Load");
      }
      else if (objUI.VisibleOnScreen == false) {
        objUI.ScrollIntoView(false);
        Delay(timePerCheck, "Waiting for Object to become Visible");
      }
      else {
        break;
      }
    }
  }
  Log.Enabled = true;
//  if(objUI.Exists != true)
//  {
//    Log.Warning("FAIL: Object is not identified after waiting for - "+ProjectSuite.Variables.GlobalObjWaitTime/1000+" seconds");
//  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : WaitObjLoad
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to wait for the UI object to load - ignoring Enabled or Disabled
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function WaitObjLoad_OLD_DONOTUSE(strLogicalName,strParent)
{
  var iCount = 0;
  var objCurrentPage;
  Log.Enabled = false;
  
  objCurrentPage = GetCurrentPageObject_WO_Validation()
  if(!objCurrentPage.Exists)
  {
    objCurrentPage = GetCurrentPageObject_WO_Validation()
  }
  
  if(strParent != null)
  {
    var objParent= objCurrentPage.WaitElement(strParent);
    objUI = objParent.WaitElement(strLogicalName);
  }
  else
  {
    objUI = objCurrentPage.WaitElement(strLogicalName);
  }
  while(iCount<100)
  {
    if(objUI.Exists == false)
    {
      Delay(500,"Waiting for Object to Load");
      iCount = iCount+1;
      objCurrentPage = GetCurrentPageObject_WO_Validation()
      if(!objCurrentPage.Exists)
      {
        objCurrentPage = GetCurrentPageObject_WO_Validation()
      }
      if(strParent != null)
      {
        var objParent= objCurrentPage.WaitElement(strParent);
        objUI = objParent.WaitElement(strLogicalName);
      }
      else
      {
        objUI = objCurrentPage.WaitElement(strLogicalName);
      }
    }
    else if(objUI.VisibleOnScreen == false)
    {
      Delay(500,"Waiting for Object to Load");
      iCount = iCount+1;
      objCurrentPage.objUI.ScrollIntoView(false);
    }
    else
      break;
  }
  Log.Enabled = true;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetUIObject
Parameters          : varPropNVArrayORXPath - Object properties, Depth - Depth, strNewPropName - Property name, strNewPropValue - Property value
Description         : Function to Get UI object
Return Value        : Object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
////function GetUIObject(varPropNVArrayORXPath,strParent,Depth,strNewPropName,strNewPropValue)
////{
////  var tempUIObject = {};
////  var tempPropNameArray = getPropNVArray(varPropNVArrayORXPath,"N");
////  var tempPropValueArray = getPropNVArray(varPropNVArrayORXPath,"V");
////  var time = 0;
////  var objCurrentPage;
////  while(time < 15)
////  {
////    if(!tempUIObject.Exists)
////    {
////      if(Array.isArray(varPropNVArrayORXPath))
////      {
////        if(strNewPropName != null && strNewPropValue != null)
////        {
////          Strings.AddNewItemToArray(tempPropNameArray,strNewPropName);
////          Strings.AddNewItemToArray(tempPropValueArray,strNewPropValue);
////        }
////        Sys.Refresh();
////        tempUIObject = GetCurrentPageObject().Find(tempPropNameArray,tempPropValueArray,Depth);
////      }
////      else
////      {
////        if(strParent != null)
////        {
////          objCurrentPage = GetCurrentPageObject_WO_Validation()
////          if(!objCurrentPage.Exists)
////          {
////            objCurrentPage = GetCurrentPageObject_WO_Validation()
////          }
//////          if(aqString.Find(strParent,"FindElement") == -1)
//////          {
//////            var objParent= objCurrentPage.WaitElement(strParent);
//////          }
//////          else
//////          {
//////            var objParent = eval("objCurrentPage"+"."+strParent)
//////          }
//// 
////          var arrParent = strParent.split(";")
////          if(arrParent.length != 0)
////          {
////            var evalParent
////            for(var p=0;p<arrParent.length;p++)
////            {
////              evalParent = evalParent+'.FindElement("'+arrParent[p]+'")'
////            }
////            evalParent = aqString.Replace(evalParent,"undefined.","")
////            var objParent = eval("objCurrentPage"+"."+evalParent) 
////          }
////          tempUIObject = objParent.WaitElement(varPropNVArrayORXPath);
////        }
////        else
////        {
////          objCurrentPage = GetCurrentPageObject_WO_Validation()
////          if(!objCurrentPage.Exists)
////          {
////            objCurrentPage = GetCurrentPageObject_WO_Validation()
////          } 
////          tempUIObject = objCurrentPage.WaitElement(varPropNVArrayORXPath);
////        }
////      }
////    }
////    if(tempUIObject.Exists)
////    {
////      break;
////    }
////    Delay(1000,"Waiting for the object to be displayed");
////    time = time + 1;
////  } 
////  return tempUIObject;
////}

function GetUIObject_OLD(strLogicalName, strParent) { 
  var tempUIObject = {};
  var time = 0;
  var PageTime = 0;
  var ParentTime = 0;
  var objCurrentPage;
  var objParent;
  
  while (time < 50) {
    if (strParent != null) {
      objCurrentPage = GetCurrentPageObject_WO_Validation();

      while (!objCurrentPage.Exists && PageTime < 50) {
//        Delay(10000, "Waiting for page to load");
        objCurrentPage = GetCurrentPageObject_WO_Validation();
        PageTime = PageTime + 1;
      }
        
      if(objCurrentPage.Exists)
      {
        var arrParent = strParent.split(";");
        if (arrParent.length != 0) {
          
          for (var p = 0; p < arrParent.length; p++) {
            if (typeof objParent !== "object" || p == 0) {
              objParent = objCurrentPage.WaitElement(arrParent[p]);
            } else {
              if(arrParent[p] != "ShadowRoot(0)") {
                SubParent = objParent.WaitElement(arrParent[p]);
              }
              else {
                SubParent = objParent.ShadowRoot(0)
              }
              
              if(SubParent.Exists)
              {
                objParent = SubParent;
              }
            }

            while (!objParent.Exists && ParentTime < 50) {
//              Delay(10, "Waiting for Parent to load");
              if (p == 0) {
                objParent = objCurrentPage.WaitElement(arrParent[p]);
              } else {
                objParent = objParent.WaitElement(arrParent[p]);
              }
              ParentTime = ParentTime + 1;
            }
          }
        }
      }
      
      if(objParent.Exists)
      {
        tempUIObject = objParent.WaitElement(strLogicalName);
      }
    } else {
      objCurrentPage = GetCurrentPageObject_WO_Validation();
      if (!objCurrentPage.Exists) {
        objCurrentPage = GetCurrentPageObject_WO_Validation();
      }
      tempUIObject = objCurrentPage.WaitElement(strLogicalName);
    }
    if (tempUIObject.Exists) {
      break;
    }
//    Delay(1000, "Waiting for the object to load");
    time = time + 1;
  }
  return tempUIObject;
}

function GetUIObject(strLogicalName, strParent) { 
  var tempUIObject = {};
  var time = 0;
  var PageTime = 0;
  var ParentTime = 0;
  var objCurrentPage;
  var objParent;
  var maxWaitTime = new Date().getTime() + 200; // 200 milliseconds
  var timePerCheck = 1; // 1 millisecond delay per check
  
  while (new Date().getTime() < maxWaitTime) {
    if (strParent != null) {
      objCurrentPage = GetCurrentPageObject_WO_Validation();

      while (!objCurrentPage.Exists && new Date().getTime() < maxWaitTime) {
        Delay(timePerCheck, "Waiting for Page to Load");
        objCurrentPage = GetCurrentPageObject_WO_Validation();
      }
        
      if(objCurrentPage.Exists)
      {
        var arrParent = strParent.split(";");
        if (arrParent.length != 0) {
          
          for (var p = 0; p < arrParent.length; p++) {
            if (typeof objParent !== "object" || p == 0) {
              objParent = objCurrentPage.WaitElement(arrParent[p]);
            } else {
              if(arrParent[p] != "ShadowRoot(0)") {
                SubParent = objParent.WaitElement(arrParent[p]);
              }
              else {
                SubParent = objParent.ShadowRoot(0)
              }
              
              if(SubParent.Exists)
              {
                objParent = SubParent;
              }
            }

            while (!objParent.Exists && new Date().getTime() < maxWaitTime) {
              Delay(timePerCheck, "Waiting for Parent Object to Load");
              if (p == 0) {
                objParent = objCurrentPage.WaitElement(arrParent[p]);
              } else {
                objParent = objParent.WaitElement(arrParent[p]);
              }
            }
          }
        }
      }
      
      if(objParent.Exists)
      {
        tempUIObject = objParent.WaitElement(strLogicalName);
      }
    } else {
      objCurrentPage = GetCurrentPageObject_WO_Validation();
      if (!objCurrentPage.Exists) {
        objCurrentPage = GetCurrentPageObject_WO_Validation();
      }
      tempUIObject = objCurrentPage.WaitElement(strLogicalName);
    }
    if (tempUIObject.Exists) {
      break;
    }
    Delay(timePerCheck, "Waiting for Object to Load");
  }
  return tempUIObject;
}

/*#########################################################################################################################################################
Function Name       : GetUIObjects
Parameters          : varPropNVArrayORXPath - Object properties, Depth - Depth, strNewPropName - Property name, strNewPropValue - Property value
Description         : Function to Get all UI objects on the page
Return Value        : Object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetUIObjects(strLogicalName, strParent) { 
  var tempUIObject = {};
  var time = 0;
  var PageTime = 0;
  var ParentTime = 0;
  var objCurrentPage;
  var objParent;
  
  while (time < 15) {
    if (strParent != null) {
      objCurrentPage = GetCurrentPageObject_WO_Validation();

      while (!objCurrentPage.Exists && PageTime < 5) {
        Delay(500, "Waiting for page to load");
        objCurrentPage = GetCurrentPageObject_WO_Validation();
        PageTime = PageTime + 1;
      }
        
      if(objCurrentPage.Exists)
      {
        var arrParent = strParent.split(";");
        if (arrParent.length != 0) {
          
          for (var p = 0; p < arrParent.length; p++) {
            if (typeof objParent !== "object" || p == 0) {
              objParent = objCurrentPage.WaitElement(arrParent[p]);
            } else {
              if(arrParent[p] != "ShadowRoot(0)") {
                SubParent = objParent.WaitElement(arrParent[p]);
              }
              else {
                SubParent = objParent.ShadowRoot(0)
              }
              
              if(SubParent.Exists)
              {
                objParent = SubParent;
              }
            }

            while (!objParent.Exists && ParentTime < 5) {
              Delay(500, "Waiting for Parent to load");
              if (p == 0) {
                objParent = objCurrentPage.WaitElement(arrParent[p]);
              } else {
                objParent = objParent.WaitElement(arrParent[p]);
              }
              ParentTime = ParentTime + 1;
            }
          }
        }
      }
      
      if(objParent.Exists)
      {
        tempUIObject = objParent.FindElements(strLogicalName);
      }
    } else {
      objCurrentPage = GetCurrentPageObject_WO_Validation();
      if (!objCurrentPage.Exists) {
        objCurrentPage = GetCurrentPageObject_WO_Validation();
      }
      tempUIObject = objCurrentPage.FindElements(strLogicalName);
    }
    if (tempUIObject.length >= 1) {
      break;
    }
    Delay(1000, "Waiting for the object to load");
    time = time + 1;
  }
  return tempUIObject;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VisibleOnScreen
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to Confirm UI element is visible on screen or not
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VisibleOnScreen(strLogicalName,strLogTxt,strParent)
{
  try
  {
    var blnResult = false;
    var Logger
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        strLogTxt = undefined; 
        Logger = false;
    }else Logger = true
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI);  
      if(objUI.VisibleOnScreen == true)
      {
        blnResult = true
        Log.Message("Object ["+ strMessage +"] is visbile on screen.");
      }
      else
      {
        Log.Warning("Object ["+ strMessage +"] is not visbile on screen.");
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: VisibleOnScreen "+err.message);
  }
  
  if(Logger==true)
  {
    writeLogline(strLogTxt,"VisibleOnScreen",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : NotVisibleOnScreen
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to Confirm UI element is not visible on screen
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function NotVisibleOnScreen(strLogicalName,strLogTxt,strParent)
{
  try
  {
    var blnResult = false;
    var Logger
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        strLogTxt = undefined; 
        Logger = false;
    }else Logger = true
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
//      var strMessage = GetUIObjectDetails(objUI);  
      if(objUI.VisibleOnScreen == false)
      {
        blnResult = true
//        Log.Message("Object ["+ strMessage +"] is not visbile on screen.");
      }
//      else
//      {
//        Log.Warning("Object ["+ strMessage +"] is not visbile on screen.");
//      }
    }
    else
      Log.Warning("FAIL: Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: VisibleOnScreen "+err.message);
  }
  
  if(Logger==true)
  {
    writeLogline(strLogTxt,"VisibleOnScreen",strLogicalName,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Enabled
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to Confirm UI element is enabled or not
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Enabled(strLogicalName,strLogTxt,strParent)
{
  try
  {
    var blnResult = false;
    var Logger
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        strLogTxt = undefined; 
        Logger = false;
    }else Logger = true
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI);  
      if(objUI.Enabled == true)
      {
        blnResult = true
        Log.Message("Object ["+ strMessage +"] is Enabled.");
      }
      else
      {
        Log.Warning("Object ["+ strMessage +"] is not Enabled.");
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Enabled "+err.message);
  }

  if(Logger==true)
  {
    writeLogline(strLogTxt,"Enabled",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : DblClickOnUIObject
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to double click on UI object
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Jun-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function DblClickOnUIObject(strLogicalName,strLogTxt,bolScroll,strParent)
{
  try
  {
    var blnResult = false;
    var Logger
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        Logger = false;
    }else if(typeof bolScroll === 'undefined'){
      bolScroll = false;
      Logger = true;  
    }
    else if(typeof bolScroll !== 'boolean'){
      if(bolScroll.startsWith("//"))
      {
        strParent = bolScroll 
        bolScroll = false;
        Logger = true
      }
    }else Logger = true
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI);
      if(objUI.VisibleOnScreen == false)
      {
        objUI.scrollIntoView(bolScroll);
        objUI.focus();
      }
      objUI.DblClick();
      blnResult = true;
      Log.Message("Object ["+ strMessage +"] is double clicked.");
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: DblClickOnUIObject "+err.message);
  }

  if(Logger==true)
	{	  
    writeLogline(strLogTxt,"DblClickOnUIObject",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : HoverOnUIObject
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to Hover on UI object
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function HoverOnUIObject(strLogicalName,intX,intY,strLogTxt,bolScroll,strParent)
{
  try
  {
    var blnResult = false;
    var Logger;
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        Logger = false;
    }else if(typeof bolScroll === 'undefined'){
      bolScroll = false;
      Logger = true;  
    }
    else if(typeof bolScroll !== 'boolean' && bolScroll.startsWith("//")){
        strParent = bolScroll 
        bolScroll = false;
        Logger = true
    }else Logger = true
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }

    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI);
      if(objUI.VisibleOnScreen == false)
      {
        objUI.scrollIntoView(bolScroll)
        Delay(1000)
      }
      objUI.HoverMouse(intX,intY);
      blnResult = true;
      Log.Message("Object ["+ strMessage +"] is Hovered On.");
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: HoverOnUIObject: "+err.message);
  }
  
  if(Logger==true)
	{	  
    writeLogline(strLogTxt,"HoverOnUIObject",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : RClickOnUIObject
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to Right click on UI object
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2022
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function RClickOnUIObject(strLogicalName,strLogTxt,bolScroll,strParent)
{
  try
  {
    var blnResult = false;
    var Logger;
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        Logger = false;
    }else if(typeof bolScroll === 'undefined'){
      bolScroll = false;
      Logger = true;  
    }
    else if(typeof bolScroll !== 'boolean' && bolScroll.startsWith("//")){
        strParent = bolScroll 
        bolScroll = false;
        Logger = true
    }else Logger = true
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI);  
      if(objUI.VisibleOnScreen == false)
      {  
        objUI.scrollIntoView(bolScroll);
        objUI.focus();
      }
      objUI.ClickR();
      blnResult = true;
      Log.Message("Object ["+ strMessage +"] is right clicked.");
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: RClickOnUIObject "+err.message);
  }

  if(Logger==true)
	{	  
    writeLogline(strLogTxt,"RClickOnUIObject",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : HoverOnUIObject_WOCoords
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to Hover on UI object without Co-ordinates
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function HoverOnUIObject_WOCoords(strLogicalName,strLogTxt,bolScroll,strParent)
{
  try
  {
    var blnResult = false;
    var Logger;
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        Logger = false;
    }else if(typeof bolScroll === 'undefined'){
      bolScroll = false;
      Logger = true;  
    }
    else if(typeof bolScroll !== 'boolean' && bolScroll.startsWith("//")){
        strParent = bolScroll 
        bolScroll = false;
        Logger = true
    }else Logger = true
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI);
      if(objUI.VisibleOnScreen == false)
      {
        objUI.scrollIntoView(bolScroll)
        Delay(1000)
      }
      objUI.HoverMouse();
      blnResult = true;
      Log.Message("Object ["+ strMessage +"] is Hovered On.");
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: HoverOnUIObject: "+err.message);
  }

  if(Logger==true)
	{	  
    writeLogline(strLogTxt,"HoverOnUIObject",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Disabled
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function  to Confirm UI element is disabled or not
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Disabled(strLogicalName,strLogTxt,strParent)
{
  try
  {
    var blnResult = false;
    var Logger;
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        strLogTxt = undefined; 
        Logger = false;
    }else Logger = true

    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI);  
      if(objUI.Enabled == false)
      {
        blnResult = true
        Log.Message("Object ["+ strMessage +"] is Disabled.");
      }
      else
      {
        Log.Warning("Object ["+ strMessage +"] is not Disabled.");
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Disabled "+err.message);
  }
  
  if(Logger==true)
	{	  
    writeLogline(strLogTxt,"Disabled",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/
/*#########################################################################################################################################################
Function Name       : Disabled
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function  to Confirm UI element is disabled or not
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Disabled_WO_Warning(strLogicalName,strLogTxt,strParent)
{
  try
  {
    var blnResult = false;
    var Logger;
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        strLogTxt = undefined; 
        Logger = false;
    }else Logger = true

    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName 
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
      var strMessage = GetUIObjectDetails(objUI);  
      if(objUI.Enabled == false)
      {
        blnResult = true
        Log.Message("Object ["+ strMessage +"] is Disabled.");
      }
      else
      {
        Log.Message("Object ["+ strMessage +"] is not Disabled.");
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Disabled "+err.message);
  }
  
  if(Logger==true)
	{	  
    writeLogline(strLogTxt,"Disabled",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : getPropNVArray
Parameters          : arrPropNVArray - propertynames array, strArrayType - Property types array
Description         : Function to Split the PropNameValue array into two arrays for Names and Values
Return Value        : Property Name, Property Vaue
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
Reviwed By           :
#########################################################################################################################################################*/
function getPropNVArray(arrPropNVArray,strArrayType)
{
  var intSourceSize = arrPropNVArray.length;
  var PropNames = new Array(intSourceSize);
  var PropValues = new Array(intSourceSize);
  for(CurrIndex = 0; CurrIndex < intSourceSize; CurrIndex++)
  {
    var strArrayItem = arrPropNVArray[CurrIndex];
    var arrSplitArray = strArrayItem.split("^");
    PropNames[CurrIndex] = arrSplitArray[0];
    PropValues[CurrIndex] = arrSplitArray[1];
  }
  switch(strArrayType)
  {
    case "N":
      return PropNames;
    case "V":
      return PropValues;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetChildUIObject
Parameters          : objParent - Parent object, varPropNVArrayORXPath - Object properties, Depth - Depth, strNewPropName - Property name,
                      strNewPropValue - Property value
Description         : Function to Get child UI object
Return Value        : Object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetChildUIObject(objParent,varPropNVArrayORXPath,Depth,strNewPropName,strNewPropValue)
{
  try
  {
    var tempUIObject = {};
    var time = 0;
    
    while(time < 15)
    {
      if(!tempUIObject.Exists)
      {
        if(Array.isArray(varPropNVArrayORXPath))
        {
          var tempPropNameArray = getPropNVArray(varPropNVArrayORXPath,"N");
          var tempPropValueArray = getPropNVArray(varPropNVArrayORXPath,"V");
          if(Array.isArray(varPropNVArrayORXPath))
          {
            if(strNewPropName != null && strNewPropValue != null)
            {
              Strings.AddNewItemToArray(tempPropNameArray,strNewPropName);
              Strings.AddNewItemToArray(tempPropValueArray,strNewPropValue);
            }
          }  
          tempUIObject = objParent.FindChild(tempPropNameArray,tempPropValueArray,Depth);
        }
        else
        {
          tempUIObject = objParent.FindElement(varPropNVArrayORXPath);
        }
      }
      if(tempUIObject.Exists)
      {
        break;
      }
      Delay(1000,"Waiting for the object to be displayed");
      time = time + 1;
    } 
  }
  catch(err)
  {
    LogFailResult("Exception: GetChildUIObject "+err.message);
  }
  finally
  {
    return tempUIObject;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Exists_Child
Parameters          : strLogicalName - LogicalName(OR)
Description         : Confirms UI element exists or not
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Exists_Child(strLogicalNameParent,strLogicalNameChild)
{
  objParent = GetUIObject(strLogicalNameParent);
  objUI = GetChildUIObject(objParent,strLogicalNameChild)
  if(!(objUI == null))
  {
    if(aqObject.IsSupported(objUI,"Enabled"))
    {
       return objUI.Exists;
    }   
  }
  else
  {
    Log.Error("UI Object does not exist.")
    return false;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : NotExists_Child
Parameters          : strLogicalName - LogicalName(OR)
Description         : Confirms UI element is not Present
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function NotExists_Child(strLogicalNameParent,strLogicalNameChild)
{ 
  var objCurObj;
  Log.Enabled = false;
  
  objCurObj = GetCurrentPageObject_WO_Validation().FindElement(strLogicalNameParent).FindElement(strLogicalNameChild);
  
  Log.Enabled = true;
  if(objCurObj.Exists == false)
  {
    return true;
  }
  else
  {
    return false;
  }  
}
/*#######################################################################################################################################################*/

/*#########################################################################################################################################################
Function Name       : GetUIObject_NotExist
Parameters          : varPropNVArrayORXPath - Object properties, Depth - Depth, strNewPropName - Property name, strNewPropValue - Property value
Description         : Gets UI object
Return Value        : Object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetUIObject_NotExist(varPropNVArrayORXPath,Depth,strNewPropName,strNewPropValue)
{
    var tempUIObject = {};
    var tempPropNameArray = getPropNVArray(varPropNVArrayORXPath,"N");
    var tempPropValueArray = getPropNVArray(varPropNVArrayORXPath,"V");
    var time = 0;
    var bol = true;
    
    while(time < 5)
    {
      if(!tempUIObject.Exists)
      {
        if(Array.isArray(varPropNVArrayORXPath))
        {
          if(strNewPropName != null && strNewPropValue != null)
          {
            Strings.AddNewItemToArray(tempPropNameArray,strNewPropName);
            Strings.AddNewItemToArray(tempPropValueArray,strNewPropValue);
          }
          Sys.Refresh();
          tempUIObject = GetCurrentPageObject().Find(tempPropNameArray,tempPropValueArray,Depth);
        }
        else
        {
          tempUIObject = GetCurrentPageObject().WaitElement(tempUIObject);
        }
      }
     
      Delay(1000,"Waiting for the object to be displayed");
      time = time + 1;
    } 
  
    return tempUIObject;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Enabled_WO_Validation
Parameters          : strLogicalName - LogicalName(OR)
Description         : Confirms UI element is enabled or not
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Enabled_WO_Validation(strLogicalName, strParent)
{
  Log.Enabled = false;
  if(strParent != null)
  {
    var objParent= GetCurrentPageObject_WO_Validation().FindElement(strParent);;
    var objUI = objParent.FindElement(strLogicalName);
  }
  else
  {
    var objUI = GetCurrentPageObject_WO_Validation().FindElement(strLogicalName);
  }  
  Log.Enabled = true;
  if((NotExists_WOLog(strLogicalName,strParent ) != true))
  {
    Log.Enabled = false;
    if((aqString.Find(aqString.ToLower(objUI.className),aqString.ToLower("rmDisabled")) != -1))
    {
      return false;
    }
    else
    {
      return objUI.Enabled;
    }
    Log.Enabled = true;
  }
  else
  {
    return false;
  }
}
/*#######################################################################################################################################################*/

/*#########################################################################################################################################################
Function Name       : Enabled_WO_Validation_Child
Parameters          : strLogicalName - LogicalName(OR)
Description         : Confirms UI element is enabled or not
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Enabled_WO_Validation_Child(strLogicalNameParent,strLogicalNameChild)
{
  Log.Enabled = false;
  var objUI = GetCurrentPageObject_WO_Validation().FindElement(strLogicalNameParent).FindElement(strLogicalNameChild);
  Log.Enabled = true;
  if((NotExists_Child(strLogicalNameParent,strLogicalNameChild) != true))
  {
    Log.Enabled = false;
    if((aqString.Find(aqString.ToLower(objUI.className),aqString.ToLower("rmDisabled")) != -1))
    {
      return false;
    }
    else
    {
      return objUI.Enabled;
    }
    Log.Enabled = true;
  }
  else
  {
    return false;
  }
}
/*#######################################################################################################################################################*/

/*#########################################################################################################################################################
Function Name       : GetUIObjectDetails
Parameters          : strLogicalName - LogicalName(OR)
Description         : Returns UI elements name/description etc
Return Value        : ObjectPropertyValue
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetUIObjectDetails(objUI)
{
  Log.Enabled = false;
  var exitFlag = false;  
  var strValue = "";
  if(objUI.Exists)
  {
    var strObjectType = aqConvert.VarToStr(objUI.ObjectType);
    if(strObjectType != "Link")
    {
      if(aqObject.IsSupported(objUI,"MappedName") && objUI.MappedName !="" && typeof objUI.MappedName !== "undefined")
      {
        strValue = aqString.Trim(objUI.MappedName);
      }
      else if(aqObject.IsSupported(objUI,"attributes") && objUI.attributes.aria_label!="" && typeof objUI.attributes.aria_label !== "undefined")
      {
        strValue = objUI.attributes.aria_label;
      }
      else if(aqObject.IsSupported(objUI,"ObjectLabel") && objUI.ObjectLabel!="" && typeof objUI.ObjectLabel !== "undefined")
      {
        strValue = objUI.ObjectLabel;
      }
      else if(aqObject.IsSupported(objUI,"Value") && objUI.Value!="" && typeof objUI.Value !== "undefined")
      {
        strValue = objUI.Value;                  
      }
      else if(aqObject.IsSupported(objUI,"contentText") && objUI.contentText!="" && typeof objUI.contentText !== "undefined")
      {
        strValue = objUI.contentText;
      }
      else if(aqObject.IsSupported(objUI,"Name") && objUI.Name!="" && !(objUI.Name).startsWith("FindElement") && typeof objUI.Name !== "undefined")
      {
        strValue = objUI.Name;                  
      }
      else if(aqObject.IsSupported(objUI,"ObjectIdentifier") && objUI.ObjectIdentifier!="" && typeof objUI.ObjectIdentifier !== "undefined")
      {
        strValue = objUI.ObjectIdentifier;
      }              
      
    }
    else if(strValue = "" && strObjectType == "Link")
    {
      if(aqObject.IsSupported(objUI,"contentText"))
      {
        strValue = objUI.contentText;
      }
    }
  }
  Log.Enabled = true;
  return strValue;
}
/*#######################################################################################################################################################*/

        
/*#########################################################################################################################################################
Function Name       : GetUIObjectLabelDetails
Parameters          : strLogicalName - LogicalName(OR)
Description         : Returns UI elements name/description etc
Return Value        : ObjectPropertyValue
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetUIObjectLabelDetails(strLogicalName, strParent)
{
  Log.Enabled = false;
  objUI = GetUIObject(strLogicalName,strParent);
  var exitFlag = false;  
  var strValue = "";
  if(Exists(strLogicalName,strParent))
  {
    var strObjectType = aqConvert.VarToStr(objUI.ObjectType);
    if(strObjectType != "Link")
    {
      if(aqObject.IsSupported(objUI,"ObjectLabel") && (objUI.ObjectLabel!="") )
      {
        strValue =  objUI.ObjectLabel;
      }
      else if(aqObject.IsSupported(objUI,"Name")&& (objUI.Name!="") && !(objUI.Name).startsWith("FindElement"))
      {
        strValue =  objUI.Name;                  
      }
      else if(aqObject.IsSupported(objUI,"ObjectIdentifier")&& (objUI.ObjectIdentifier!=""))
      {
        strValue =   objUI.ObjectIdentifier;
      }
      else if((aqObject.IsSupported(objUI,"contentText"))&& (objUI.contentText!=""))
      {
        strValue =  objUI.contentText;
      }
      else if((aqObject.IsSupported(objUI,"textContent"))&& (objUI.textContent!=""))
      {
        strValue =  objUI.textContent;
      }      
    }
    else if(strObjectType == "Link")
    {
      if(aqObject.IsSupported(objUI,"contentText"))
      {
        strValue =  objUI.contentText;
      }
    }
  } 
  Log.Enabled = true;
  return strValue; 
}
/*#########################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetChildCount
Parameters          : objTable - UI Table Element
Description         : Function to return count of Child Items
Return Value        : Row Count
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetChildCount(strLogicalName,strParent)
{
  var intChildCount = -1;
  var objReq = GetUIObject(strLogicalName,strParent);
  if(aqObject.IsSupported(objReq,"ChildCount"))
  {
    intChildCount = objReq.ChildCount
  }
  return intChildCount;
}
/*#########################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Click
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to click on UI object
Return Value        : True or False
Author              : Arun 
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Click(strLogicalName,strLogTxt,bolScroll,strParent)
{
  try
  {
    var blnResult = false;
    var Logger;
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        Logger = false;
    }else if(typeof bolScroll === 'undefined'){
      bolScroll = false;
      Logger = true;  
    }
    else if(typeof bolScroll !== 'boolean'){
      if(bolScroll.startsWith("//"))
      {
        strParent = bolScroll 
        bolScroll = false;
        Logger = true
      }
    }else Logger = true 
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName
      objUI.RefreshMappingInfo()
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
//      var strMessage = GetUIObjectDetails(objUI); 
      if(objUI.VisibleOnScreen == false)
      {     
        objUI.scrollIntoView(bolScroll);
        objUI.focus();
      }
      objUI.Click();
      blnResult = true;
//      Log.Message("Object ["+ strMessage +"] is clicked.");
    }
    else
//      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
        Log.Warning("FAIL: Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Click: "+err.message);
  }
  
  if(Logger==true)
	{	 
    writeLogline(strLogTxt,"Click",strLogicalName,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : EnableFlutterAccessibility
Parameters          : -
Description         : Function to enable the flutter accessiblity in the web browser console window
Return Value        : -
Author              : Arun 
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function EnableFlutterAccessibility()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Enable Flutter Accessibility");
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  WaitObjLoad("flutter-view")
  Log.Message("Enabling the flutter accessiblity in the browser's console window")
  Log.Enabled = false
  page = Aliases.browser.Page("*")
  page.Keys("^!J")
  page.Keys("[Enter]")
  if(page.WaitElement("//iframe[contains(@src,'construct') or @id='contentFrame']").Exists != true)
  {
//    page.Keys("document.querySelector('flt-glass-pane').shadowRoot.querySelector('flt-semantics-placeholder').click({force: true});")
//    page.Keys("[Enter]")
    page.Keys("document.querySelector('flt-semantics-placeholder').click({force: true});")
    page.Keys("[Enter]")
  }
  else
  {
    page.Keys("document.querySelector('iframe[[src*=\\'construct\\'], iframe#contentFrame').contentWindow.document.querySelector('flt-semantics-placeholder').click({force: true});")
    page.Keys("[Enter]")
  }
  page.Keys("^!J")
  Log.Enabled = true
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------
}

/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : EnableFlutterAccessibility
Parameters          : -
Description         : Function to enable the flutter accessiblity in the web browser console window
Return Value        : -
Author              : Arun 
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function EnableFlutterAccessibility_CT()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Enable Flutter Accessibility");
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  WaitObjLoad(Aliases.browser.pageConstruct.FlutterView)
  Log.Message("Enabling the flutter accessiblity in the browser's console window")
  Log.Enabled = false
  page = Sys.Browser("chrome").Page("*")
  page.Keys("^!J")
  page.Keys("[Enter]")
  if(page.WaitElement("//iframe[contains(@src,'construct') or @id='contentFrame']").Exists != true)
  {
    page.Keys("document.querySelector('flt-glass-pane').shadowRoot.querySelector('flt-semantics-placeholder').click({force: true});")
//    page.Keys("document.querySelector('flt-semantics-placeholder').click({force: true});")
    page.Keys("[Enter]")
  }
  else
  {
    page.Keys("document.querySelector('iframe[[src*=\\'construct\\'], iframe#contentFrame').contentWindow.document.querySelector('flt-glass-pane').shadowRoot.querySelector('flt-semantics-placeholder').click({force: true});")
//    page.Keys("document.querySelector('iframe[[src*=\\'construct\\'], iframe#contentFrame').contentWindow.document.querySelector('flt-semantics-placeholder').click({force: true});")
    page.Keys("[Enter]")
  }
  page.Keys("^!J")
  Log.Enabled = true
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------
}

/*#######################################################################################################################################################*/


function RightClick(strLogicalName,strLogTxt,bolScroll,strParent)
{
  try
  {
    var blnResult = false;
    var Logger;
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else if(strLogTxt.startsWith("//")){
        strParent = strLogTxt 
        Logger = false;
    }else if(typeof bolScroll === 'undefined'){
      bolScroll = false;
      Logger = true;  
    }
    else if(typeof bolScroll !== 'boolean' && bolScroll.startsWith("//")){
        strParent = bolScroll 
        bolScroll = false;
        Logger = true
    }else Logger = true  
    
    if(typeof strLogicalName === "object")
    {
      objUI = strLogicalName
      objUI.RefreshMappingInfo() 
    }
    else
    {
      objUI = GetUIObject(strLogicalName,strParent);
    }
    
    if(objUI.Exists)
    {
      objName = objUI.Name
      var strMessage = GetUIObjectDetails(objUI);  
      if(objUI.VisibleOnScreen == false)
      {  
        objUI.scrollIntoView(bolScroll);
        objUI.focus();
      }
      objUI.ClickR();
      blnResult = true;
      Log.Message("Object ["+ strMessage +"] is right clicked.");
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: RClickOnUIObject "+err.message);
  }
  
  if(Logger==true)
  {
    writeLogline(strLogTxt,"RClickOnUIObject",strMessage,blnResult);
  }
  return blnResult;
}


function GetApplicationURL(currEnv)
{
    var ParentEnv = ProjectSuite.Variables.AllEnvironments.Item(6,currEnv)
    var SubEnv =  ProjectSuite.Variables.AllEnvironments.Item(7,currEnv)
    var MidURL =  ProjectSuite.Variables.AllEnvironments.Item(8,currEnv)

    var strURL = "https://"+ParentEnv+MidURL+SubEnv
//    Log.Message("URL - "+strURL)
    
    ProjectSuite.Variables.ParentENV = ParentEnv
    ProjectSuite.Variables.SubENV = SubEnv
      
    return strURL
}


function Click_WOScroll(strLogicalName,strParent)
{
  try
  {
    var bolClick = false;
    var objReq = GetUIObject(strLogicalName,strParent);
    if(objReq.Exists)
    {
      var strMessage = GetUIObjectDetails(strLogicalName,strParent);    
      objReq.Click();
      bolClick = true;
      Log.Message("Label ["+ strMessage +"] is clicked.");
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: ClickOnUIObject: "+err.message);
  }
  finally
  {
    return bolClick;
  }
}

function VerifyAlertMessage(StrMessage)
{
  var bolFlag = false;
  var iCount = 0;
  StrMessage="";
 
  while(iCount<100)
  {
    objPage = GetCurrentPageObject()
    if(objPage.Alert.Exists == false)
    {
      Delay(100,"Waiting for Alert Message to Load");
      iCount = iCount+1;
    }
    else
      break;
  }
  if(objPage.Alert.Exists)
  {
    if(aqString.Find(aqString.ToLower(aqString.replace(objPage.Alert.Label("Message").Text,"\n","")),aqString.ToLower(aqString.replace(StrMessage,"\n",""))) != -1)
    {
      bolFlag = true;
    }
  }
 
  return bolFlag;
}
