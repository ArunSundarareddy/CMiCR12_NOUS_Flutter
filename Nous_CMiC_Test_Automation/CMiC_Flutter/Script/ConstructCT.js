//USEUNIT Reference_Libraries


/*###############################################################################################################################################################
Function Name       : CMiC_ConstructCTLogout
Parameters          : -
Description         : Function to logout from the CMiC application
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CMiC_ConstructCTLogout()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Logout from the application");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  if(NotExists_WOLog(CCT_btnLogout,CCT_ShadowRoot) == true)
//  {
//    WaitObjLoad(CCT_btnNavigationMenuBar,CCT_ShadowRoot);
//    Click(CCT_btnNavigationMenuBar,"Navigate to Project Name",CCT_ShadowRoot);
//    WaitUntilToLoad()
//    WaitObjLoad(CCT_btnLogout,CCT_ShadowRoot);
//  }
////---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Click(CCT_btnLogout,"Click on Log Out",CCT_ShadowRoot);//Action Performed
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseBrowser(); 
  Log.Checkpoint("Close the browser")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CCT_SelectProject
Parameters          : -
Description         : Function to Select Project in CT app
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CCT_SelectProject(dictTestData)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Select Project");

  var strProject = dictTestData.Item("strProject")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  if(NotExists_WOLog(CCT_btnNavigationMenuBar,CCT_ShadowRoot) != true)
  {
    WaitObjLoad(CCT_btnNavigationMenuBar,CCT_ShadowRoot);
    Click(CCT_btnNavigationMenuBar,"Navigate to Project Name",CCT_ShadowRoot);
    WaitUntilToLoad()
    WaitObjLoad(CCT_btnProject,CCT_ShadowRoot);
  }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CCT_btnProject,"Click on Project",CCT_ShadowRoot);//Action Performed
  WaitObjLoad(CCT_txtProjectSearch,CCT_ShadowRoot);
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Enter(CCT_txtProjectSearch,strProject,"Search for Project ["+strProject+"]",CCT_ShadowRoot)
  WaitObjLoad(CCT_txtProjectSearchResult,CCT_ShadowRoot);
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CCT_txtProjectSearchResult,"Select Project",CCT_ShadowRoot);//Action Performed
  WaitObjLoad(CCT_btnProject,CCT_ShadowRoot);
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CCT_btnProject,"Project name ["+strProject+"] is displayed on the menu under Project. User can select and save a Project.",CCT_ShadowRoot)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}

/*#########################################################################################################################################################
Function Name       : CreateCREW
Parameters          : 
Description         : This funstion is used to create CREW in construct ct
Return Value        : CREW Code
Author              : Naresh
Creation Date       : July 2024
#########################################################################################################################################################*/
function EnterCREWDetail(){
  try{
    CrewCode =  "CREW"+Math.floor(Math.random() * 100000);
    CrewName ="TestAutomation "
  
    CREW_CancelButton = "[aria-label='CANCEL']"
    CREW_CreateCodeButton = "[aria-label='Create Crew']"
    CREW_MandatoryFields = "[aria-label='This field is mandatory']"
    //-------------------------------------------------------------------------------------------------------------
    EnableFlutterAccessibility_CT()
    objPage = GetCurrentPageObject_WO_Validation()
    //-------------------------------------------------------------------------------------------------------------
    OCR.Recognize(objPage).BlockByText("Crew Code").Click();
    objPage.Keys(CrewCode)
    writeLogline("Entered CREW code "+CrewCode,"Enter","",true)
    //-------------------------------------------------------------------------------------------------------------
    OCR.Recognize(objPage).BlockByText("Crew Name").Click();
    objPage.Keys(CrewName)
    writeLogline("Entered CREW Name  "+CrewName,"Enter","",true)
    //-------------------------------------------------------------------------------------------------------------
    OCR.Recognize(objPage).BlockByText("Start Date").Click();
    OCR.Recognize(objPage).BlockByText("OK").Click();
    writeLogline("Entered Start date  ","Enter","",true)
    //-------------------------------------------------------------------------------------------------------------
    OCR.Recognize(objPage).BlockByText("Shift").Click();
    WaitUntilToLoad()
    objShiftListItem = GetUIObject("[aria-label='All']",CCT_ShadowRoot)
    writeLogline("Clicked Shift text box  ","Click","",true)
    if(objShiftListItem.Exists){
      objShiftListItem.Click()
      writeLogline("Entered Shift as All  ","Enter","",true)
    }else{
      Click(CREW_CancelButton,"Item not found, Clicked Cancel button",CCT_ShadowRoot)
    }
    //-------------------------------------------------------------------------------------------------------------
    OCR.Recognize(objPage).BlockByText("Responsible Person").Click();
    WaitUntilToLoad()
    writeLogline("Click Responsible Person text box  ","Click","",true)
    objReponsiblePersonList = GetUIObject("[role='text']",CCT_ShadowRoot)
    if(objReponsiblePersonList.Exists){
       objReponsiblePersonList.Click()
       writeLogline("Responsible person selected" , "Click Person list","",true)
    }else{
      Click(CREW_CancelButton,"Item not found, Clicked Cancel button",CCT_ShadowRoot)
    }
    //-------------------------------------------------------------------------------------------------------------
    OCR.Recognize(objPage).BlockByText("Foreman",spTopMost).Click();
    writeLogline("Click Foreman text box  ","Click","",true)
    objForeManList = GetUIObject("[role='text']",CCT_ShadowRoot)
    if(objForeManList.Exists){
      objForeManList.Click()
      writeLogline("Select Responsible Person details ","Select","",true)
    }else{
      Click(CREW_CancelButton,"Item not found, Clicked Cancel button",CCT_ShadowRoot)
    }
    //-------------------------------------------------------------------------------------------------------------
    Click(CREW_CreateCodeButton,"click",CCT_ShadowRoot)
    ErrorObjects = GetUIObject(CREW_MandatoryFields,CCT_ShadowRoot)
    if(ErrorObjects.Exists){
      writeLogline("Errors are displayed "+ErrorObjects.contentText,"Exists","",false)
    }else{
      writeLogline("CREW created succesfully "+CrewCode,"Exists","",true)
    }
    return CrewCode;
  }catch(e){
    writeLogline(" failed in CreateCREW ","","",false)
  }
}
 