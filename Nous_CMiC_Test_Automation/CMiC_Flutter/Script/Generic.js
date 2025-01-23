//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
KillTaskProcess //Function to kill any task process required
CreateFolder_FileSystem //Function to create folder if folder doesn't exists
VerifyFolderExists_FileSystem //Function to verify whether folder exists or not
DeleteFolder_FileSystem //Function to delete folder if folder exists
GetScriptName //Function to fetch the Test Item Name
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : KillTaskProcess
Parameters          : strProcessName - Process name from 'Details' tab in Task Manager
Description         : Function to kill any task process required
Return Value        : true or false
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function KillTaskProcess(strProcessName)
{
  try
  {
   // var strProcessName = Project.Variables.strBrowserNameForTest
    var intLoopCount = 0;
    Log.Enabled = false;
    var strReturnStatus = false;
    if(strProcessName == "Edge"){
        strProcessName = "msedge";
      }
    else if (strProcessName == "Chrome"){
        strProcessName = "Chrome";
      }
    else  if(strProcessName == "Excel"){
        strProcessName = "EXCEL";       
     }     
     else  if(strProcessName == "iexplore"){
        strProcessName = "iexplore";       
     }  
      else  if(strProcessName == "Firefox"){
        strProcessName = "firefox";       
     }     
      
    while(Sys.FindChild("ProcessName", strProcessName).Exists && intLoopCount<=10 )
    {
      var currProcess = Sys.FindChild("ProcessName", strProcessName);
      currProcess.Terminate();
      intLoopCount = intLoopCount + 1;
      Sys.Refresh();
    }
    //Verifying if the process terminated above is still available
    if(!(Sys.FindChild("ProcessName", strProcessName).Exists))
      strReturnStatus = true;
    Log.Enabled = true;
  }
  catch(err)
  {
    Log.Error("Exception: KillTaskProcess: "+err.description);
  }
  finally
  {
    strProcessName = ""
    return strReturnStatus;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CreateFolder_FileSystem
Parameters          : strFolderpath - path of the folder to be created
Description         : Function to create folder if folder doesn't exists
Return Value        : true or false
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CreateFolder_FileSystem(strFolderpath)
{
  try
  {
    var bolFlag = false;
    var objFileSys = getActiveXObject("Scripting.FileSystemObject");
    if(! objFileSys.FolderExists(strFolderpath))
    {
      objFileSys.CreateFolder(strFolderpath);
      if(VerifyFolderExists_FileSystem(strFolderpath))
      {
        bolFlag = true;
      }
    }
    else
    {
      bolFlag = true;
    }
  }
  catch(err)
  {
    Log.Error("FAIL:: "+err.description);
  }
  finally
  {
    return bolFlag;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VerifyFolderExists_FileSystem
Parameters          : strFolderpath - path of the folder
Description         : Function to verify whether folder exists or not
Return Value        : true or false
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyFolderExists_FileSystem(strFolderpath)
{
  try
  {
    var boolFolderFlag = false;
    var objFileSys = getActiveXObject("Scripting.FileSystemObject");   
    if(objFileSys.FolderExists(strFolderpath))
      boolFolderFlag = true;
  }
  catch(err)
  {
    Log.Error("FAIL:: "+err.description);
  }
  finally
  {
    return(boolFolderFlag);
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : DeleteFolder_FileSystem
Parameters          : strFolderpath - path of the folder to be deleted
Description         : Function to delete folder if folder exists
Return Value        : true or false
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function DeleteFolder_FileSystem(strFolderpath)
{
  try
  {
    var bolFlag = false;
    var objFileSys = getActiveXObject("Scripting.FileSystemObject");
    if(objFileSys.FolderExists(strFolderpath))
    {
      objFileSys.DeleteFolder(strFolderpath,true);
      if(!(objFileSys.FolderExists(strFolderpath)))
      {
        bolFlag = true;
      }
    }
  }
  catch(err)
  {
    Log.Error("FAIL:: "+err.description);
  }
  finally
  {
    return bolFlag;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetScriptName
Parameters          : Script Name - Test Item Name
Description         : Function to fetch the Test Item Name
Return Value        : true or false
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetScriptName()
{
  try
  {
    var scriptName;
    var strProjectCnt = Project.TestItems.ItemCount;
    for(var intval = 0;intval < strProjectCnt-1;intval++)
    {
      var strTestName = Project.TestItems.Current.ElementToBeRun.Caption;
      var strTmpScriptName = strTestName.split("-");
      var scriptName = strTmpScriptName[1];
    }
  }
  catch(err)
  {
    Log.Error("FAIL:: "+err.description);
  }
  finally
  {  
    return(scriptName);
  } 
}
/*#######################################################################################################################################################*/


function shortDelay()
{
var ms = 10000;
var HelpStr = "Delaying test run for " + ms + "milliseconds.";
aqUtils.Delay (ms, HelpStr);
}

function mediumDelay()
{
var ms = 20000;
var HelpStr = "Delaying test run for " + ms + "milliseconds.";
aqUtils.Delay (ms, HelpStr);
}

function longDelay()
{
var ms = 30000;
var HelpStr = "Delaying test run for " + ms + "milliseconds.";
aqUtils.Delay (ms, HelpStr);
}

function delay2k()
{
var ms=  2000;
var HelpStr = "Delaying test run for " + ms + "milliseconds.";
aqUtils.Delay (ms, HelpStr);
}

function delay3k()
{
var ms=  3000;
var HelpStr = "Delaying test run for " + ms + "milliseconds.";
aqUtils.Delay (ms, HelpStr);
}

function WaitUntilToLoad()
{
var ms = 5000;
var HelpStr = "Delaying test run for " + ms + "milliseconds.";
aqUtils.Delay (ms, HelpStr);
}

/*#########################################################################################################################################################
Function Name       : VerifyPDFText
Parameters          : 
Description         : Function to verify web version of PDF contains the given text
Return Value        : true or false
Author              : Arun
Creation Date       : 03-May-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyPDFText(strPageURL,strVerifyText)
{
  bolVerify = false;
   
  //Clearing the clipboard
  Sys.Keys("[Win]r")
  Sys.Keys("cmd[Enter]")
  Sys.Keys("echo off | clip[Enter]")
  Sys.keys("exit[Enter]")
  Delay(4000)//addeddelay
  CreateStepFolder("Verify Data exists in the PDF window")
  var strBrowserProcess = Project.Variables.strBrowserNameForTest
  Sys.Browser(strBrowserProcess).Page(strPageURL).Wait();
  Sys.Browser(strBrowserProcess).Page(strPageURL).FindElement("#if1").Click(); 
   
  Delay(4000)
  Sys.Keys("^a")
  Delay(2000)
  Sys.Keys("^c") 
  Delay(2000) 
  var strClipBoard = Sys.Clipboard
  Log.Message("Clipboard Data from PDF window: "+strClipBoard)
  
  arrVerifyText = strVerifyText.split(";")
  for(var p=0;p<arrVerifyText.length;p++)
  {
    if(aqString.Find(strClipBoard,aqString.Trim(arrVerifyText[p])) != -1)
    {
      Log.Message("Text ["+aqString.Trim(arrVerifyText[p])+"] found in PDF")
      bolVerify = true;
    }
    else
    {
      Log.Error("Text ["+aqString.Trim(arrVerifyText[p])+"] not found in PDF")
      bolVerify = false;
      break;
    }
  }
  CloseFolder()
  
  return bolVerify;
}

