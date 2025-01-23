//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
Enter //Function to enter text in the textbox object
EnterKey //Function to enter text using Keystrokes in the textbox object
Verify //Function to verify text in the textbox object
VerifyPartialText //Function to verify partial text in the textbox object
GetText //Function to get text from the textbox object
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Enter
Parameters          : strLogicalName - LogicalName(OR), strText - string, bolKeys - true or false
Description         : Function to enter text in the textbox object
Return Value        : True or False
Author              : Arun 
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Enter(strLogicalName,strText,strLogTxt,strParent,bolKeys)
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
      if(objUI.VisibleOnScreen == false)
      {     
        objUI.scrollIntoView(bolScroll);
        objUI.focus();
      }
      objUI.Click()
      objName = objUI.Name
//      var strMessage = GetUIObjectDetails(objUI);
      if(!bolKeys)
      {
        if(aqObject.IsSupported(objUI,"SetText"))
        {
        objUI.SetText(strText);
//        objUI.Keys("[Enter]")
        blnResult = true
//        Log.Message("Text [ "+strText+" ] was entered in the field [ "+ strMessage + " ]")
        }
        else
        {
          objUI.Keys("^a[Del]"+strText)
          blnResult = true
        }
      }
      else
      {
        if (aqObject.IsSupported(objUI,"text"))
        {
          objUI.Text=""
        }
        else if(aqObject.IsSupported(objUI,"value"))
        {
          objUI.value=""
        } 
        objUI.Keys(strText);
        blnResult = true
//        Log.Message("Text [ "+strText+" ] was entered in the field [ "+ strMessage + " ]")
      }
    }
    else
      Log.Warning("FAIL: Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Enter: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"Enter",strLogicalName,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : EnterKey
Parameters          : strLogicalName - LogicalName(OR), strText - string, bolKeys - true or false
Description         : Function to enter text using Keystrokes in the textbox object
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function EnterKey(strLogicalName,strText,strLogTxt,strParent)
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
      objName = objUI.Name
//      var strMessage = GetUIObjectDetails(objUI);
//      objUI.Click()
      objUI.Keys(strText+"[Enter]");
      blnResult = true
//      Log.Message("Text [ "+strText+" ] was entered in the field [ "+ strMessage + " ]")        
    }
    else
      Log.Warning("FAIL: Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Enter: "+err.message);
  }
  
  if(Logger==true)
	{	
    writeLogline(strLogTxt,"Enter",strLogicalName,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Verify
Parameters          : strLogicalName - LogicalName(OR), strExpText - string, bolShouldMatch - true or false
Description         : Function to verify text in the textbox object
Return Value        : True or False
Author              : Arun
Creation Date       : 28-Apr-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Verify(strLogicalName,strExpText,bolShouldMatch,strLogTxt,strParent)
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
    
    var strExpText;
    var strActText;
    
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
      strExpText = aqConvert.VarToStr(strExpText)
      objName = objUI.Name
      var strMessage = GetUIObjectDetails(objUI);
      if(aqObject.IsSupported(objUI,"Text"))
      {
         strActText = objUI.Text
      }
      else if(aqObject.IsSupported(objUI,"contentText"))
      {
        strActText = objUI.contentText
      }
      if((strActText == "") && (aqObject.IsSupported(objUI,"value")))
      {
        strActText = objUI.value
      }
    
      if((aqString.ToLower(strExpText.replace(/\r?\n|\r/g, "").replace(/\s+/g,"").replace(/[^a-zA-Z0-9]/g, ""))==aqString.ToLower(strActText.replace(/\r?\n|\r/g, "").replace(/\s+/g,"").replace(/[^a-zA-Z0-9]/g, "")))==bolShouldMatch)
      {
        if(bolShouldMatch == true)
        {
          Log.Message("Text [ "+strActText+" ] in the field [ "+ strMessage + " ] is matching the expected [ "+strExpText+" ]");         
        }
        else
        {
          Log.Message("Text [ "+strActText+" ] in the field [ "+ strMessage + " ] is NOT matching the expected [ "+strExpText+" ]");
        }
        blnResult = true;
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Verify: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"Verify",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VerifyPartialText
Parameters          : strLogicalName - LogicalName(OR), strExpText - string
Description         : Function to verify partial text in the textbox object
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyPartialText(strLogicalName,strExpText,strLogTxt,strParent)
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
    
    var strActText
    
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
      if(aqObject.IsSupported(objUI,"value"))
      {
        strActText = objUI.value
      }
      else if(aqObject.IsSupported(objUI,"Text"))
      {
         strActText = objUI.Text
      }
      else if(aqObject.IsSupported(objUI,"contentText"))
      {
        strActText = objUI.contentText
      }
      
      if(aqString.Find(aqString.ToLower(aqString.replace(strActText,"\n","")),aqString.ToLower(aqString.replace(strExpText,"\n",""))) != -1)
      {
        blnResult = true;
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Verify: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"Verify",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/
/*#########################################################################################################################################################
Function Name       : VerifyPartialTextforDropDown
Parameters          : strLogicalName - LogicalName(OR), strExpText - string
Description         : Function to verify partial text in the DropDown object
Return Value        : True or False
Author              : Chethana Ramaswamy
Creation Date       : 26-June-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyPartialTextforDropDown(strLogicalName,strExpText,strLogTxt,strParent)
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
    
    var strActText
    
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
      if(aqObject.IsSupported(objUI,"Text"))
      {
         strActText = objUI.Text
      }
      else if(aqObject.IsSupported(objUI,"contentText"))
      {
        strActText = objUI.contentText
      }
      else if(aqObject.IsSupported(objUI,"wText"))
      {
        strActText = objUI.wText
      }      
      if(aqString.Find(aqString.ToLower(aqString.replace(strActText,"\n","")),aqString.ToLower(aqString.replace(strExpText,"\n",""))) != -1)
      {
        blnResult = true;
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Verify: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"Verify",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/



/*#########################################################################################################################################################
Function Name       : GetText
Parameters          : strLogicalName - LogicalName(OR), strExpText - string, bolShouldMatch - true or false
Description         : Function to get text from the textbox object
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetText(strLogicalName,strLogTxt,strParent)
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
    
    var strGetText;
    
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
      if(aqObject.IsSupported(objUI,"value"))
      {
        strGetText = objUI.value;
        blnResult = true;
      }  
      else if(aqObject.IsSupported(objUI,"wText"))
      {
        strGetText = objUI.wText;
        blnResult = true;
      }
      else if(aqObject.IsSupported(objUI,"Text"))
      {
        strGetText = objUI.Text;
        blnResult = true;
      }
      else if(aqObject.IsSupported(objUI,"contentText"))
      {
        strGetText = objUI.contentText;
        blnResult = true;
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: GetText: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"GetText",strMessage,blnResult);
  }
  return [blnResult,strGetText];
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VerifyPartialText
Parameters          : strLogicalName - LogicalName(OR), strExpText - string
Description         : Function to verify partial text in the textbox object
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyPartialTextAriaLabel(strLogicalName,strExpText,strLogTxt,strParent)
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
    
    var strActText
    
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
      if(aqObject.IsSupported(objUI,"outerHTML"))
      {
         strActText = objUI.outerHTML
      }
      if(aqString.Find(aqString.ToLower(aqString.replace(strActText,"\n","")),aqString.ToLower(aqString.replace(strExpText,"\n",""))) != -1)
      {
        blnResult = true;
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: VerifyPartialTextAriaLabel: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"VerifyPartialTextAriaLabel",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VerifyPartialTextNotExists
Parameters          : objUI - LogicalName(OR), strExpText - string, bolShouldMatch - true or false
Description         : Function to verify text is not visible in the text object
Return Value        : True or False
Author              : 
Creation Date       : 21-Apr-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyPartialTextNotExists(strLogicalName,strExpText,strLogTxt,strParent)
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
    
    var strActText
    
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
      if(aqObject.IsSupported(objUI,"Text"))
      {
         strActText = objUI.Text
      }
      else if(aqObject.IsSupported(objUI,"contentText"))
      {
        strActText = objUI.contentText
      }
      if(aqString.Find(aqString.ToLower(aqString.replace(strActText,"\n","")),aqString.ToLower(aqString.replace(strExpText,"\n",""))) == -1)
      {
        blnResult = true;
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: VerifyPartialTextNotExists: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"VerifyPartialTextNotExists",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/



function EnterTab(strLogicalName,strText,strLogTxt,strParent,bolKeys)
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
      if(!bolKeys)
      {
        if(aqObject.IsSupported(objUI,"SetText"))
        {
        objUI.Click();
        objUI.SetText(strText);
        objUI.Keys("[Tab]")
        blnResult = true
        Log.Message("Text [ "+strText+" ] was entered in the field [ "+ strMessage + " ]")
        }
      }
      else
      {
        if (aqObject.IsSupported(objUI,"text"))
        {
          objUI.Text=""
        }
        else if(aqObject.IsSupported(objUI,"value"))
        {
          objUI.value=""
        } 
        objUI.Keys(strText);
        blnResult = true
        Log.Message("Text [ "+strText+" ] was entered in the field [ "+ strMessage + " ]")
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Enter: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"Enter",strMessage,blnResult);
  }
  return blnResult;
}


