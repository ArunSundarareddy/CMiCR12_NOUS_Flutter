//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
LaunchURL //Function to launch the given URL
GetCurrentPageObject //Function to get the current page object
GetBrowserObject //Function to get the current Browser object
CloseBrowser //Function to close the current Browser
CloseBrowsers //Function to close all the open Browsers
CloseBrowserPage //Function to close the current Browser tab page
MaximizeBrowser //Function which Maximizes the current Browser window
ClearCache_Browser //Function to Clear the Cache of the browser
SetBrowserZoom100 //Function to set the Browser zoom to 100
SetBrowserZoom75 //Function to to set the Browser zoom to 75
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : LaunchURL
Parameters          : None
Description         : Function to launch the given URL
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  : 1. Browser to be used is fetched from the Project variables "strBrowserNameForTest"
                      2. Assigns the launched page object to the Project variables "objPage"
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function LaunchURL(strURL,strLogTxt)
{
  try
  {
    var blnResult = false;
    var Logger;
    var strBrowser = Project.Variables.strBrowserNameForTest
    
    if(typeof strLogTxt === 'undefined'){
      Logger = false;     
    }else{
      Logger = true;
    }
    
    if(aqString.Find(strBrowser,"Headless") == -1)
    {
      Log.Message("Project.Variables.ClearCache - "+Project.Variables.ClearCache)
      if(Project.Variables.ClearCache == true)
      {
       ClearCache_Browser(strBrowser);
       Project.Variables.ClearCache = false
      }
    }
    
    KillTaskProcess("Excel");
    
    var objBrowser = GetBrowserObject(strBrowser);
    
    Log.Enabled = false
    if(objBrowser.Exists != true)
    {
      objBrowser.Run()
    }
    Log.Enabled = true
    
    objBrowser.Navigate(strURL);
    
    if(aqString.Find(strBrowser,"Headless") == -1)
    {
      Sys.Keys("[Esc]")
      var objPage = Sys.Browser(strBrowser).WaitPage("*");
      Sys.Browser(strBrowser).BrowserWindow(0).Maximize();
    }
    else
    {
      var objPage = Sys.Browser("Remote").WaitPage("*");
    }
    
    if(objPage.Exists)
    {
      Project.Variables.objPage = objPage;
      Log.Message("Launch browser " + strBrowser + " and navigate to URL : " + strURL);
      blnResult = true;
    }
    else
      Project.Variables.objPage = false;
  }
  catch(err)
  {
    Log.Error("Exception: LaunchURL: "+err.message);
  }

  if(Logger==true)
  {
    writeLogline(strLogTxt,"LaunchURL",strURL,blnResult);
  }  
  return blnResult;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetCurrentPageObject
Parameters          : None
Description         : Function to get the current page object
Return Value        : Object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetCurrentPageObject_OLD()
{
  try
  {
    strBrowserProcess = Project.Variables.strBrowserNameForTest
    objPage = Project.Variables.objPage
//    objCurrPage = Aliases.browser.WaitPage("*");

    if (Project.Variables.strNewPageUrl == "")
      {
      objCurrPage = Sys.Browser(Project.Variables.strBrowserNameForTest).WaitPage("*");
      }
    else
      {
        objCurrPage = Sys.Browser(Project.Variables.strBrowserNameForTest).WaitPage(Project.Variables.strNewPageUrl);
      }
    
    if(objPage== null && objCurrPage != EmptyObject && objCurrPage.url != "")
    {
      objPageUrl = objCurrPage.url;
      Project.Variables.objPage = objCurrPage;
      objPage = objCurrPage;
    }
    else if(objPage.url!=objCurrPage.url)
    {
      objPageUrl = objCurrPage.url;
      Project.Variables.objPage = objCurrPage;
      objPage = objCurrPage;
    }
    else
    {
      Project.Variables.objPage = objPage;
    }
    
//  arrstrPropNames = Array("ObjectType", "URL");
//  arrstrPropValues = Array("Page", objPageUrl);
    
//  objReq = Aliases.browser.WaitPage("*").Find(arrstrPropNames,arrstrPropValues,1000)
//  objReq = Sys.Browser(Project.Variables.strBrowserNameForTest).WaitPage("*").Find(arrstrPropNames,arrstrPropValues,1000)
    
    if(objPage.Exists)
      return objPage;
    else
      return false;
  }
  catch(err)
  {
    Log.Error("GetCurrentPageObject: "+err.message);
  }
}

function GetCurrentPageObject()
{
  strBrowserProcess = Project.Variables.strBrowserNameForTest
  objPage = Project.Variables.objPage
  objCurrPage = Aliases.browser.WaitPage("*");
  
    if (Project.Variables.strNewPageUrl == "")
      {
      objCurrPage = Aliases.browser.WaitPage("*");
      }
    else
      {
        objCurrPage = Aliases.browser.WaitPage(Project.Variables.strNewPageUrl);
      }
    
  if(objPage== null && objCurrPage != EmptyObject && objCurrPage.url != "")
  {
    objPageUrl = objCurrPage.url;
    Project.Variables.objPage = objCurrPage;
    objPage = objCurrPage;
  }
  else if(objPage.url!=objCurrPage.url)
  {
    objPageUrl = objCurrPage.url;
    Project.Variables.objPage = objCurrPage;
    objPage = objCurrPage;
  }
  else
  {
    Project.Variables.objPage = objPage;
  }
    
//  arrstrPropNames = Array("ObjectType", "URL");
//  arrstrPropValues = Array("Page", objPageUrl);
    
//  objReq = Aliases.browser.WaitPage("*").Find(arrstrPropNames,arrstrPropValues,1000)
//  objReq = Aliases.browser.WaitPage("*").Find(arrstrPropNames,arrstrPropValues,1000)
  return objPage;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetCurrentPageObject_WO_Validation
Parameters          : None
Description         : Function which provides the current page object without validation
Return Value        : Object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetCurrentPageObject_WO_Validation()
{
  strBrowserProcess = Project.Variables.strBrowserNameForTest
  objPage = Project.Variables.objPage
  objCurrPage = Aliases.browser.WaitPage("*");
  
    if (Project.Variables.strNewPageUrl == "")
      {
      objCurrPage = Aliases.browser.WaitPage("*");
      }
    else
      {
        objCurrPage = Aliases.browser.WaitPage(Project.Variables.strNewPageUrl);
      }
    
  if(objPage== null && objCurrPage != EmptyObject && objCurrPage.url != "")
  {
    objPageUrl = objCurrPage.url;
    Project.Variables.objPage = objCurrPage;
    objPage = objCurrPage;
  }
  else if(objPage.url!=objCurrPage.url)
  {
    objPageUrl = objCurrPage.url;
    Project.Variables.objPage = objCurrPage;
    objPage = objCurrPage;
  }
  else
  {
    Project.Variables.objPage = objPage;
  }
    
//  arrstrPropNames = Array("ObjectType", "URL");
//  arrstrPropValues = Array("Page", objPageUrl);
    
//  objReq = Aliases.browser.WaitPage("*").Find(arrstrPropNames,arrstrPropValues,1000)
//  objReq = Aliases.browser.WaitPage("*").Find(arrstrPropNames,arrstrPropValues,1000)
  return objPage;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetBrowserObject
Parameters          : None
Description         : Function to get the current Browser object
Return Value        : Object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetBrowserObject()
{
  let strBrowserName = Project.Variables.strBrowserNameForTest
  switch(strBrowserName)
  {
    case "Chrome":
      return Browsers.Item(btChrome);
    case "ChromeHeadless":
      var server = "localhost";
      var capabilities = {
        "browserName": "chrome",
        "screenResolution": "1920x1080"
      };
      return Browsers.RemoteItem(server,capabilities);
    case "Firefox":
      return Browsers.Item(btFirefox);
    case "iexplore":
      return Browsers.Item(btIExplorer);
    case "Edge":
      return Browsers.Item(btEdge);
    default:
      Runner.Stop()
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CloseBrowser
Parameters          : None
Description         : Function to close the current Browser
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CloseBrowser()
{
  while (Sys.WaitBrowser().Exists)
  {
    Sys.WaitBrowser().Close();
    return true;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CloseBrowsers
Parameters          : None
Description         : Function to close all the open Browsers
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CloseBrowsers()
{
  strBrowserName = aqString.ToLower(Project.Variables.strBrowserNameForTest);
  var objBrowser = Sys.WaitBrowser(strBrowserName, 3000)
  while(objBrowser.Exists)
  {
    objBrowser.Terminate();
    Log.Message("Terminating " + Project.Variables.strBrowserNameForTest + " browser.");
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CloseBrowserPage
Parameters          : strURL - URL to be closed
Description         : Function to close the current Browser tab page
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CloseBrowserPage(strURL)
{
  strBrowserName = aqString.ToLower(Project.Variables.strBrowserNameForTest);
  var objBrowserPage = Sys.WaitBrowser().Page(strURL+"*")
  while(objBrowserPage.Exists)
  {
    Log.Enabled = false;
    objBrowserPage.Close();
    Log.Enabled = true;
    Log.Message("Closing the URL: " + strURL);
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : MaximizeBrowser
Parameters          : None
Description         : Function which Maximizes the current Browser window
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function MaximizeBrowser()
{
  Sys.Browser(Project.Variables.strBrowserNameForTest).BrowserWindow(0).Maximize()
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : ClearCache_Browser
Parameters          : strBrowser - browser name
Description         : Function to Clear the Cache of the browser
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function ClearCache_Browser(strBrowser)
{
  try{
      //Variable Declaration
      var strReturnStatus = false;

      //Kill the browser if it is active
      KillTaskProcess(strBrowser);
      
      //Clear Cache using keystrokes 
      var objBrowser = GetBrowserObject();  
      if(strBrowser == "iexplore")
      {
        objBrowser.Run();
        objBrowser.Navigate("about:blank")
        Sys.Keys("^![Del]")
        Delay(2000);
        Sys.Keys("[Left]")
        Sys.Keys("[Enter]")
        Delay(5000);
        let objClose= Sys.Browser(Project.Variables.strBrowserNameForTest).BrowserWindow(0).Window("Frame Notification Bar", "", 1).Window("DirectUIHWND", "", 1).MSAAObject("btn_Close")  
        if(objClose.Exists)
        {
          objClose.Click()
        }
      }      
      else
      {         
        objBrowser.Navigate("about:blank")
        Sys.Keys("[Tab][Tab][Tab][Tab][Esc]")
        Sys.Keys("^![Del]")
        Delay(1500)
        if(strBrowser == "Chrome")
        {
          Sys.Keys("[Tab][Tab][Tab][Tab][Tab][Tab]")
          Delay(1000)
          Sys.Keys("a")
          Sys.Keys("![Tab]![Tab]![Tab]![Tab]![Tab]")
          Sys.Keys("[Enter]")
        }
        else if(strBrowser == "Edge")
        {
          Sys.Keys("[Enter]")
          Sys.Keys("a")
          Sys.Keys("[Enter]")
          Sys.Keys("![Tab]![Tab]![Tab]")
          Sys.Keys("[Enter]")
        } 
      }
      Delay(1000)
      strReturnStatus= true
   } 
       
   catch(err)
   {
     Log.Error("Exception: ClearCache_Browser "+err.description);
   }
   
   finally
   {
      return strReturnStatus;
   }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : SetBrowserZoom100
Parameters          : -
Description         : Function to set the Browser zoom to 100
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function SetBrowserZoom100()
{
  Delay(2000)
  Sys.Keys("^-")
  Sys.Keys("^-")
  Sys.Keys("^-")
  Sys.Keys("^-")
  Sys.Keys("^-")
  Sys.Keys("^-")
  Sys.Keys("^-")
  Delay(2000)
  Sys.Keys("^+")
  Sys.Keys("^+")
  Sys.Keys("^+")
  Sys.Keys("^+")
  Sys.Keys("^+")
  Sys.Keys("^+")
  Sys.Keys("^+")
  Delay(2000)
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : SetBrowserZoom75
Parameters          : -
Description         : Function to to set the Browser zoom to 75
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function SetBrowserZoom75()
{
  Delay(2000)
  Sys.Keys("^-")
  Sys.Keys("^-")
  Sys.Keys("^-")
}
/*#######################################################################################################################################################*/

function LaunchURL_NewTab(strURL)
{
  blnResult = false
  try{
    var strBrowser = Project.Variables.strBrowserNameForTest
    var objBrowser = GetBrowserObject(strBrowser);
    Log.Enabled = false
    GetCurrentPageObject().Keys("^t")
    objBrowser.Run(strURL)
    Log.Enabled = true
    blnResult = true
}
  catch(err)
  {
    Log.Error("Exception: LaunchURL_NewBrowserInstance "+err.description);
  }

//--Return Value-------------------------------------------------------------------------------------------------------------------------------------------
  return blnResult;
}


/*#########################################################################################################################################################
Function Name       : SetBrowserZoom50
Parameters          : -
Description         : Function to to set the Browser zoom to 50
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function SetBrowserZoom50()
{
  Delay(2000)
  Sys.Keys("^-")
  Sys.Keys("^-")
  Sys.Keys("^-")
  Sys.Keys("^-")
  Sys.Keys("^-")
}
/*#######################################################################################################################################################*/
