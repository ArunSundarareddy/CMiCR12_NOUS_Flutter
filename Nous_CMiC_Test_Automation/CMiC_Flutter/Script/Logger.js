//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
writeLogline //Function which handles the log messages
CreateTestCaseFolder //Function used to create test case folder in Log
CreateStepFolder //Function used to create test step folder in Log
CreateFolder //Function used to create simple log folder
CloseFolder //Function used to close log folder
CorrectRGBComponent //Function used to return RGB component
RGB //Function used to return RGB values
LogCheckPoint //Function used to log checkpoint with green font
LogPassResult //Function used to log pass result
LogFailResult //Function used to log fail result with red font
LogWarningResult //Function used to log warning message
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : writeLogline
Parameters          : strLogTxt - string, mFunction - string, gObject - objectname - string, blnResult - true or false
Description         : Function which handles the log messages
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function writeLogline(strLogTxt,mFunction,gObject,blnResult)
{
  if(blnResult == true)
  {
    LogCheckPoint(strLogTxt,mFunction,gObject);
  }
  else
  {
    LogFailResult(strLogTxt,mFunction,gObject);
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CreateTestCaseFolder
Parameters          : strTestCaseName - string
Description         : Function used to create test case folder in Log
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CreateTestCaseFolder(strTestCaseName)
{
  attr = Log.CreateNewAttributes();
  attr.BackColor = RGB(199, 207, 219);
  attr.Bold = true;
  CreateFolder("TestCase: "+strTestCaseName,attr);
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CreateStepFolder
Parameters          : strStepName - string
Description         : Function used to create test step folder in Log
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CreateStepFolder(strStepName)
{
  attr = Log.CreateNewAttributes();
  attr.BackColor = RGB(230, 231, 237);
  attr.Bold = true
  CreateFolder("Step: "+strStepName,attr)
}
/*#######################################################################################################################################################*/
  

/*#########################################################################################################################################################
Function Name       : CreateFolder
Parameters          : strFolderName - String, objAttr - Attribute Object
Description         : Function used to create log folder
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CreateFolder(strFolderName,objAttr)
{
  Log.AppendFolder(strFolderName,"", pmNormal,objAttr)
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CloseFolder
Parameters          : None
Description         : Function used to close log folder
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CloseFolder()
{
  Log.PopLogFolder()
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CorrectRGBComponent
Parameters          : component - object
Description         : Function used to return RGB component
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CorrectRGBComponent(component)
{
  component = aqConvert.VarToInt(component);
  if (component < 0)
    component = 0;
  else
    if (component > 255)
      component = 255;
  return component;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : RGB
Parameters          : r, g, b - object
Description         : Function used to return RGB values
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function RGB(r, g, b)
{
  r = CorrectRGBComponent(r);
  g = CorrectRGBComponent(g);
  b = CorrectRGBComponent(b);
  return r | (g << 8) | (b << 16);
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : LogCheckPoint
Parameters          : strStepName - string , strLogDetails - string, blFlag  - true or false
Description         : Function used to log checkpoint with green font
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function LogCheckPoint(strLogText,mFunction,gObject)
{  
  try
  {
    let strBrowserProcess = Project.Variables.strBrowserNameForTest;
    var objAttribute1 = Log.CreateNewAttributes();
    objAttribute1.FontColor = clGreen;
    objAttribute1.Bold = true;  
    Log.Checkpoint("Step= "+strLogText+"; Function= "+mFunction+"; Object/Parameter= "+gObject,"",pmNormal,objAttribute1,Aliases.browser.Page("*").Picture());
  }
  catch(expName)
  {
    Log.Error("Failed: "+ strLogText,"Exception : " + expName);
  } 
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : LogPassResult
Parameters          : strStepName - string , strLogDetails - string
Description         : Function used to log pass result
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function LogPassResult(strBrowserProcess,strStepName, strLogDetails)
{
  try
  {
//    Log.Checkpoint(strStepName + " - " + strLogDetails,strLogDetails,pmNormal,"",Sys.Browser(strBrowserProcess).BrowserWindow(0));
    Log.Checkpoint(strStepName + " - " + strLogDetails,strLogDetails,pmNormal,"",Sys.Browser(Project.Variables.strBrowserNameForTest).BrowserWindow(0));
  }
  catch(expName)
  {
    Log.Error("Logging Failed "+ strStepName,"Exception : " + expName);
  } 
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : LogFailResult
Parameters          : strLogText - string, mFunction - string , gObject - object
Description         : Function used to log fail result with red font
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function LogFailResult(strLogText,mFunction,gObject)
{
  try
  {
    var objAttribute2 = Log.CreateNewAttributes();
    objAttribute2.FontColor = clRed;
    objAttribute2.Bold = true;    
    Log.Error("Step= "+strLogText+"; Function= "+mFunction+"; Object/Parameter= "+gObject,"", pmNormal,objAttribute2,Aliases.browser.Page("*").Picture());
//    Runner.Stop(true);
  }
  catch(expName)
  {
    Log.Error("Logging Failed "+ strLogText,"Exception : " + expName);
  } 
} 
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : LogWarningResult
Parameters          : strStepName - string, strLogDetails - string
Description         : Function used to log warning message
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function LogWarningResult(strStepName, strLogDetails)
{
  try
  {
    Log.Warning(strStepName + strLogDetails, strLogDetails, pmNormal, null, Sys.Desktop.ActiveWindow());
  }
  catch(expName)
  {
    Log.Error("Logging Failed "+ strStepName,"Exception : " + expName);
  }  
}
/*#######################################################################################################################################################*/



