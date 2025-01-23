//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
Select //Function to select an item from dropdown
IsItemPresentDPD //Function to check if item is present in dropdown
VerifyItemSelected //Function to verify if item is selected in dropdown
SelectIndex //Function to select an item from dropdown based on Index
Select_KEYS //Function to select an item from dropdown using Keystrokes
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Select
Parameters          : strLogicalName - LogicalName(OR), strItemToSelect - item to select - string
Description         : Function to select an item from dropdown
Return Value        : True
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
#########################################################################################################################################################*/
function Select(strLogicalName,strItemToSelect,strLogTxt,bolScroll,strParent)
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
      var intItemCount = objUI.wItemCount;    
      for(var k=0;k<intItemCount;k++)
      {
        if(objUI.wItem(k).replace(/\s/g,'').toLowerCase() == strItemToSelect.replace(/\s/g,'').toLowerCase())
        {
          if(objUI.VisibleOnScreen == false)
          {     
            objUI.scrollIntoView(bolScroll);
            objUI.focus();
          }
          objUI.ClickItem(strItemToSelect)
          blnResult = true;
          break                                                                                                                                                            
        }
      }
      if(blnResult == true)
      {
        Log.Message("Object [ "+ strItemToSelect +" ] is selected")
      }
      else
      {
        Log.Warning("Object [ "+ strItemToSelect +" ] is Not present to select")
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Select: "+err.message);
  }
  
  if(Logger==true)
	{	
    writeLogline(strLogTxt,"Select",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : IsItemPresentDPD
Parameters          : strLogicalName - LogicalName(OR), strItemToFind - item to find - string
Description         : Function to check if item is present in dropdown
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function IsItemPresentDPD(strLogicalName,strItemToFind,strLogTxt,strParent)
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
    
    var strActItemName
    
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
      if(aqObject.IsSupported(objUI,"wItem"))
      {
        var strMessage = GetUIObjectDetails(objUI);
        var intItemCount = objUI.wItemCount;
        for(CurIndex = 0; CurIndex < intItemCount ; CurIndex++)
        {
          strActItemName = objUI.wItem(CurIndex);
          if(aqString.ToLower(strActItemName)==aqString.ToLower(strItemToFind))
          {
            blnResult = true;
            break;
          }
        }
        if(blnResult == true)
        {
          Log.Message("Object [ "+ strItemToSelect +" ] is present")
        }
        else
        {
          Log.Warning("Object [ "+ strItemToSelect +" ] is Not present")
        }
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: IsItemPresent "+err.message);
  }
  
  if(Logger==true)
	{	
    writeLogline(strLogTxt,"IsItemPresent",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VerifyItemSelected
Parameters          : strLogicalName - LogicalName(OR), strExpItemToVerify - item to verify - string
Description         : Function to verify if item is selected in dropdown
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyItemSelected(strLogicalName,strExpItemToVerify,strLogTxt,strParent)
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
      if(aqObject.IsSupported(objUI,"wText"))
      {
        var strMessage = GetUIObjectDetails(objUI);
        var strActItemSelectedText = objUI.wText;
        if((aqString.ToLower(strExpItemToVerify)==aqString.ToLower(strActItemSelectedText)))
        {
          Log.Message("Item [ "+strActItemSelectedText+" ] is matching the expected [ "+strExpItemToVerify+" ]");
          blnResult = true;
        }
        else
        {
          Log.Warning("Item [ "+strActItemSelectedText+" ] is NOT matching the expected [ "+strExpItemToVerify+" ]");
        }
      } 
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Error("Exception: VerifyItemSelected "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"VerifyItemSelected",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : SelectIndex
Parameters          : strLogicalName - LogicalName(OR), strItemToSelect - item to select - string
Description         : Function to select an item from dropdown based on Index
Return Value        : True
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
#########################################################################################################################################################*/
function SelectIndex(strLogicalName,strItemToSelect,bolScroll,strParent)
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
      if(aqObject.IsSupported(objUI,"ClickItem"))
      {
        if(objUI.VisibleOnScreen == false)
        {     
          objUI.scrollIntoView(bolScroll);
          objUI.focus();
        }
        objUI.ClickItem(strItemToSelect)
        blnResult = true;
        Log.Message("Object [ "+ strItemToSelect +" ] is selected")
      }
      else
      {
        Log.Warning("Item [ "+ strItemToSelect +" ] is NOT selected")
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Select: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"Select",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Select_KEYS
Parameters          : strLogicalName - LogicalName(OR), strItemToSelect - item to select - string
Description         : Function to select an item from dropdown using Keystrokes
Return Value        : True
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
#########################################################################################################################################################*/
function Select_KEYS(strLogicalName,strItemToSelect,strLogTxt,strParent) 
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
      objUI.Keys(strItemToSelect+"[Tab]") 
      Delay(1000) 
      if(aqString.ToLower(aqString.Replace(aqString.Replace(aqString.Replace(aqString.Replace(aqString.Replace(aqString.Replace(aqString.Replace(objUI.wText,/\r?\n|\r/g, ""),/\s+/g,""),/[^a-zA-Z0-9]/g, "")," ",""),"\n",""),",",""),"-",""))==aqString.ToLower(aqString.Replace(aqString.Replace(aqString.Replace(aqString.Replace(aqString.Replace(aqString.Replace(aqString.Replace(strItemToSelect,/\r?\n|\r/g, ""),/\s+/g,""),/[^a-zA-Z0-9]/g, "")," ",""),"\n",""),",",""),"-","")))
      { 
        blnResult= true; 
      } 
      if(blnResult == true)
      {
        Log.Message("Object [ "+ strItemToSelect +" ] is selected")
      }
      else
      {
        Log.Warning("Object [ "+ strItemToSelect +" ] is Not present to select")
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Error("Exception: Select "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"Select",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/

