//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
Check //Function to select a CheckBox
VerifyCheck //Function to verify a CheckBox is selected
UnCheck //Function to unselect a CheckBox
VerifyUnCheck //Function to verify a CheckBox is Unchecked
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : Check
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to select a CheckBox
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function Check(strLogicalName,strLogTxt,bolScroll,strParent)
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
      var isChecked = objUI.checked;
      if(bolCheck == true && !isChecked)
      {
        if(objUI.VisibleOnScreen == false)
        {     
          objUI.scrollIntoView(bolScroll);
          objUI.focus();
        }
        objUI.Click();
        Log.Message("Object ["+ strMessage +"] is checked.");
      }
      else
      {
        Log.Message("Object ["+ strMessage +"] is already checked.");
      }
      blnResult = true;
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Check: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"Check",strMessage,blnResult);
  }
  return blnResult;
}


function CheckNew(strLogicalName,bolCheck,strLogTxt,bolScroll,strParent)
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
      var isChecked = objUI.checked;
      if(bolCheck == true && !isChecked)
      {
        if(objUI.VisibleOnScreen == false)
        {     
          objUI.scrollIntoView(bolScroll);
          objUI.focus();
        }
        objUI.Click();
        Log.Message("Object ["+ strMessage +"] is checked.");
      }
      else if(bolCheck == false && isChecked)
      {
        if(objUI.VisibleOnScreen == false)
        {     
          objUI.scrollIntoView(bolScroll);
          objUI.focus();
        }
        objUI.Click();
        Log.Message("Object ["+ strMessage +"] is checked.");
      }
      else
      {
        Log.Message("Object ["+ strMessage +"] is already checked.");
      }
      blnResult = true;
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: Check: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"Check",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VerifyCheck
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to verify a CheckBox is checked
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyCheck(strLogicalName,bolCheck,strLogTxt,strParent)
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
      var isChecked = objUI.checked;
      if(bolCheck == true && isChecked==true)
      {
        Log.Message("Object ["+ strMessage +"] is checked.");
        blnResult = true;
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: VerifyCheck "+err.message);
  }
  
  if(Logger==true)
	{	
    writeLogline(strLogTxt,"VerifyCheck",strMessage,blnResult);
  }
  return blnResult;
}


function VerifyCheckNew(strLogicalName,bolCheck,strLogTxt,strParent)
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
      var isChecked = objUI.checked;
      if(bolCheck == true && isChecked==true)
      {
        Log.Message("Object ["+ strMessage +"] is checked.");
        blnResult = true;
      }
      else if(bolCheck == false && isChecked==false)
      {
        Log.Message("Object ["+ strMessage +"] is Unchecked.");
        blnResult = true;
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: VerifyCheck "+err.message);
  }
  
  if(Logger==true)
	{	
    writeLogline(strLogTxt,"VerifyCheck",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : UnCheck
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to unselect a CheckBox
Return Value        : True or False
Author              : Arun
Creation Date       : 28-Apr-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function UnCheck(strLogicalName,strLogTxt,bolScroll,strParent)
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
      var isChecked = objUI.checked;
      if(isChecked)
      {
        if(objUI.VisibleOnScreen == false)
        {     
          objUI.scrollIntoView(bolScroll);
          objUI.focus();
        }
        objUI.Click();
        Log.Message("Object ["+ strMessage +"] is Unchecked.");
      }
      else
      {
        Log.Message("Object ["+ strMessage +"] is already UnChecked.");
      }
      blnResult = true;
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: UnCheck: "+err.message);
  }
  
  if(Logger==true)
	{	
    writeLogline(strLogTxt,"UnCheck",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VerifyUnCheck
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to verify a CheckBox is Unchecked
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyUnCheck(strLogicalName,strLogTxt,strParent)
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
      var isChecked = objUI.checked;
      if(isChecked==false)
      {
        Log.Message("Object ["+ strMessage +"] is UnChecked.");
        blnResult = true;
      }
    }
    else
      Log.Warning("FAIL: ["+ strMessage+ "] Object is not identified");
  }
  catch(err)
  {
    Log.Warning("Exception: VerifyUnCheck "+err.message);
  }
  
  if(Logger==true)
	{	
    writeLogline(strLogTxt,"VerifyUnCheck",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/



