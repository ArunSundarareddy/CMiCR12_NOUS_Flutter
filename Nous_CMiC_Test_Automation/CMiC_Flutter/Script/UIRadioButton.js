//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
CheckRadio //Function to select a radio button
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CheckRadio
Parameters          : strLogicalName - LogicalName(OR)
Description         : Function to select a radio button
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CheckRadio(strLogicalName,strLogTxt,bolScroll,strParent)
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
      var isChecked = objUI.wChecked;
      if(!isChecked)
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
    Log.Warning("Exception: CheckRadio: "+err.message);
  }
  
	if(Logger==true)
	{	
    writeLogline(strLogTxt,"CheckRadio",strMessage,blnResult);
  }
  return blnResult;
}
/*#######################################################################################################################################################*/



