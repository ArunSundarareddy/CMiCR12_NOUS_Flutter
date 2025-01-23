//USEUNIT Reference_Libraries

/*###############################################################################################################################################################
Function Name       : CPM_OpenChooseProjectDialog()
Parameters          : None
Description         : Function to Open and Choose Project from Construct PM
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_OpenChooseProjectDialog()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  if(NotExists_WOLog(CPM_btnProjectSelection) == true)
  {
    WaitObjLoad(CPM_btnNavigationDrawerIcon)
    Click(CPM_btnNavigationDrawerIcon,"Navigate to Project Name");
    WaitObjLoad(CPM_btnProjectSelection)
  }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click_Wcoords(CPM_btnProjectSelection,10,10,"Click on the Project Name");
  WaitObjLoad(CPM_lblRecentProjects);
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_lblRecentProjects,"Search screen is open")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_lnkRecentlyOpenedProject,"Recent projects opened are shown")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  WaitObjLoad(CPM_txtRecentProjectSearch);
//  Sys.Keys("[Tab]")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_OpenChooseProjectDialog()
Parameters          : strProjectName - name of the project to choose
Description         : Function to Search for a Project and Select
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_SearchAndSelectProject(strProjectName)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CPM_OpenChooseProjectDialog()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Enter(CPM_txtRecentProjectSearch,strProjectName,"Search with a Valid Keyword ["+strProjectName+"]") 
  WaitObjLoad(CPM_lnkProjectSearchResults);
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  VerifyPartialTextAriaLabel(CPM_lnkProjectSearchResults,strProjectName,"Search Results are displayed for Project");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkProjectSearchResults,"Click on the Project Name from search result to open the project");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  if(NotExists_WOLog(CPM_btnProjectSelection) != true)
  {
    VerifyPartialTextAriaLabel(CPM_btnProjectSelection,strProjectName,"User is able to successfully select project from results");
  }
  else
  {
    VerifyPartialTextAriaLabel(CPM_btnProjectHeader,strProjectName,"User is able to successfully select project from results");
  }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_CreateRFI()
Parameters          : dictTestData - TestData
Description         : Function to Create RFI
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_CreateRFI(dictTestData)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Create RFI")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  var strSubject = "Subject_"+GetDateTimeStamp()
  var strToContact = dictTestData.Item("ToContact")
  var strActionCode = dictTestData.Item("ActionCode")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  if(NotExists_WOLog(CPM_btnCreateRFI) == true)
  {
    Click(CPM_btnRFIs,"Click on RFIs");
  }
  WaitObjLoad(CPM_btnCreateRFI)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnCreateRFI,"Click on CREATE RFI");
  WaitObjLoad(CPM_txtSubject)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_txtSubject1,"Click on Subject") 
  Enter(CPM_txtSubject,strSubject,"Enter the Subject ["+strSubject+"]")
  WaitObjLoad(CPM_btnRFIToAddContact)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnRFIToAddContact,"Click Add Contact for 'To'")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  if(NotExists_WOLog(CPM_txtRFIAddContactSearch) != true)
  {
    Enter(CPM_txtRFIAddContactSearch,strToContact,"Enter the Contact ["+strToContact+"] to Search")
  }
  WaitObjLoad(CPM_lnkRFIContactSearchResult1) 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkRFIContactSearchResult1,"Select the Contact")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Log.Enabled = false
  if(NotExists_WOLog(CPM_txtRFIActionCode) != true)
  {
    Click(CPM_txtRFIActionCode) 
    Enter(CPM_txtRFIActionCode,strActionCode,"Select the Action Code ["+strActionCode+"]")
  }
  Log.Enabled = true
  WaitObjLoad(CPM_btnSubmit)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnSubmit,"Click Submit")
  WaitObjLoad(CPM_txtSearchRecord)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//--Return Value-------------------------------------------------------------------------------------------------------------------------------------------------
  return strSubject;
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_DeleteRecord()
Parameters          : strRecord - Record name
Description         : Function to Delete Record
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeleteRecord_Old(strRecord)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Delete Record")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage = Sys.Browser("chrome").Page("*")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Refresh the Browser to disable the EnableAccessibility button
  objPage.Keys("[F5]")
  WaitUntilToLoad()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.keys(strRecord)
  WaitUntilToLoad()
  Log.Message("Search Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Log.Enabled = false
  OCR.Recognize(objPage).BlockByText(aqDateTime.Today()).Click();
  Log.Enabled = true
//  objPage.Keys("![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab][Enter]")  
  WaitUntilToLoad()
  Log.Message("Open Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("[Tab][Tab][Tab][Enter]")
  WaitUntilToLoad()
  Log.Message("Delete Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("![Tab][Enter]")
  WaitUntilToLoad()
  Log.Message("Confirm Delete Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("[Tab][Tab][Tab][Enter]")
  WaitUntilToLoad()
  LogCheckPoint("Record Deleted","CPM_DeleteRecord","")
  objPage.Keys("[F5]")
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  EnableFlutterAccessibility()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}


function CPM_DeleteRecord(strRecord)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Delete Record")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  WaitObjLoad(CPM_btnShowMenu)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnShowMenu,"Click on the Show Menu button")
  WaitObjLoad(CPM_btnDelete)
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnDelete,"Click on Delete button")
  WaitObjLoad(CPM_btnDeleteConfirm)
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnDeleteConfirm,"Click on Delete Confirm button")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_CreateLinkedRFI()
Parameters          : None
Description         : Function to create linked RFI
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_CreateLinkedRFI()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  let dictTestData = ReadXlInputDataValues("ConstructPM", "C4491")
  var strExistingRFI
//  ProjectSuite.Variables.TestCaseID = dictTestData.Item("TestRailTCID")
//  Log.Message("TestCaseID: "+ProjectSuite.Variables.TestCaseID)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("RFI- Add Related Objects");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("1 - Click on RFIs and create RFIs to Link")  
  strExistingRFI = CPM_CreateRFI(dictTestData)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("2 - Click on any existing RFI from records") 
  Click(CPM_txtSearchRecord,"Click Search Record") 
  Enter(CPM_txtSearchRecord,strExistingRFI,"Search an existing RFI ["+strExistingRFI+"]")
  WaitObjLoad(CPM_lnkRFISearchResult1) 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkRFISearchResult1,"Click on the searched RFI")
  WaitObjLoad(CPM_btnLinkRelatedObjects)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("3 - Click on Link Related Objects") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjects,"Click on Link Related Objects")
  WaitObjLoad(CPM_btnLinkRelatedObjectsRFI)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("4 - Choose any option: RFI") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjectsRFI,"Click on RFI for Link Related Objects")
  WaitObjLoad(CPM_btnLinkRelatedObjectsExisting)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjectsExisting,"Click on Existing")
  WaitObjLoad(CPM_lnkRFISearchResult1)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkRFISearchResult1,"Select an existing RFI to Link")
  WaitObjLoad(CPM_btnLinkRelatedObjectsCheckMark)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("5 - Select the Option to Link") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjectsCheckMark,"Click on Check Mark to select the existing RFI to Link")
  WaitObjLoad(CPM_btnRFIAddedRelatedObjectShowMenu)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("6 - Linked item is shown in the Related Objects strip") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_btnRFIAddedRelatedObjectShowMenu,"Linked item is shown in the Related Objects strip")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  return strExistingRFI;
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_CreateLinkedIssue()
Parameters          : None
Description         : Function to create linked Issue
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_CreateLinkedIssue()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  let dictTestData = ReadXlInputDataValues("ConstructPM", "C4503")
  var strIssueSubject
//  ProjectSuite.Variables.TestCaseID = dictTestData.Item("TestRailTCID")
//  Log.Message("TestCaseID: "+ProjectSuite.Variables.TestCaseID)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Issues - Add Related Objects");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("1 - Click on Issues and create Issues to Link")  
  strIssueSubject = CPM_CreateIssue(dictTestData) 
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("2 - Click on any existing Issue from records") 
  Click(CPM_txtSearchRecord,"Click Search Record") 
  Enter(CPM_txtSearchRecord,strIssueSubject,"Search an existing Issue ["+strIssueSubject+"]")
  WaitObjLoad(CPM_lnkRFISearchResult1) 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkRFISearchResult1,"Click on the searched Issue")
  WaitObjLoad(CPM_btnLinkRelatedObjects)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("3 - Click on Link Related Objects") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjects,"Click on Link Related Objects")
  WaitObjLoad(CPM_btnLinkRelatedObjectsRFI)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("4 - Choose any option: RFI") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjectsRFI,"Click on RFI for Link Related Objects")
  WaitObjLoad(CPM_btnLinkRelatedObjectsExisting)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjectsExisting,"Click on Existing")
  WaitObjLoad(CPM_lnkRFISearchResult1)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkRFISearchResult1,"Select an existing RFI to Link")
  WaitObjLoad(CPM_btnLinkRelatedObjectsCheckMark)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("5 - Select the Option to Link") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjectsCheckMark,"Click on Check Mark to select the existing RFI to Link")
  WaitObjLoad(CPM_btnRFIAddedRelatedObjectShowMenu)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("6 - Linked item is shown in the Related Objects strip") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_btnRFIAddedRelatedObjectShowMenu,"Linked item is shown in the Related Objects strip")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  return strIssueSubject;
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_UnlinkRelatedObject()
Parameters          : None
Description         : Function to UNlink Related Object
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_UnlinkRelatedObject_OLD(strRecord)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Unlink Related Object")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage = Sys.Browser("chrome").Page("*")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Refresh the Browser to disable the EnableAccessibility button
  objPage.Keys("[F5]")
  WaitUntilToLoad()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.keys(strRecord)
  WaitUntilToLoad()
  Log.Message("Search Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Log.Enabled = false
  SetBrowserZoom75()
  OCR.Recognize(objPage).BlockByText(aqDateTime.Today()).Click();
  Log.Enabled = true
//  objPage.Keys("![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab][Enter]")  
  WaitUntilToLoad()
  WaitUntilToLoad()
  Log.Message("Open Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("![Tab]![Tab]![Tab]![Tab][Enter]")
  WaitUntilToLoad()
  Log.Message("Open Show Menu of the Related Object to Unlink","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  OCR.Recognize(objPage).BlockByText("Unlink").Click();
  Log.Message("Click Unlink and Confirm Unlink","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("![Tab][Enter]")
  SetBrowserZoom100()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  EnableFlutterAccessibility()
  NotExists_WOLog(CPM_btnAddedRelatedObjectUnlink,"User is able to Unlink the added object")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}

function CPM_UnlinkRelatedObject()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Click on the added related object")  
  Click(CPM_btnAddedRelatedObjectShowMenu,"Click on show menu of the added related object")
  WaitObjLoad(CPM_btnAddedRelatedObjectUnlink)
  Exists(CPM_btnAddedRelatedObjectUnlink,"User is able to see Unlink option")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Click on Unlink to remove related object from related object strip")  
  Click(CPM_btnAddedRelatedObjectUnlink,"Click on Unlink")
  Click(CPM_btnAddedRelatedObjectUnlink,"Click on Unlink to remove related object from related object strip")
//  WaitUntilToLoad()
  NotVisibleOnScreen(CPM_btnAddedRelatedObjectUnlink,"User is able to Unlink the added object")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CMiC_ConstructPMLogout
Parameters          : -
Description         : Function to logout from the CMiC application
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CMiC_ConstructPMLogout()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Logout from the application");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  if(NotExists_WOLog(CPM_btnHeaderBar) != true)
//  {
//    Click(CPM_btnHeaderBar,"Navigate to Project Name");
//    WaitObjLoad(CPM_btnProjectSettings);
//  }
//  Click(CPM_btnProjectSettings,"Click on Settings button");//Action Performed 
//  WaitObjLoad(CPM_btnLogout);
////---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Click(CPM_btnLogout,"Click on Log Out");//Action Performed
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseBrowser(); 
  Log.Checkpoint("Close the browser")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_CreateNewContact
Parameters          : strFirstName,strLastName,strCompany - test data
Description         : Function to create a new contact
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_CreateNewContact(strFirstName,strLastName,strCompany)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Create a New Contact");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("1 - Click on Contacts icon")  
  Click(CPM_btnContacts,"Click on Contacts");
  WaitObjLoad(CPM_btnNewContact)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_btnNewContact,"'New Contact' options is displayed")
//  Exists(CPM_btnAssignContacts,"'Assign Contacts' options is displayed");
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("2 - Click on New Contact")  
  Click(CPM_btnNewContact,"Click on New Contact");
  WaitObjLoad(CPM_txtNewContactFirstName)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_txtNewContactFirstName,"Details screen is open")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("3 - Enter the details and click on the checkmark icon")  
  Enter(CPM_txtNewContactFirstName,strFirstName,"Enter the First Name ["+strFirstName+"]")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Enter(CPM_txtNewContactLastName,strLastName,"Enter the Last Name ["+strLastName+"]")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_dpdNewContactCompany,"Navigate to the Company Search")
//  WaitObjLoad(CPM_txtNewContactCompanySearch)  
////---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  if(NotExists_WOLog(CPM_txtNewContactCompanySearch) != true)
//  {
//    Enter(CPM_txtNewContactCompanySearch,strCompany,"Enter the Company ["+strCompany+"] to Search")
//  }
  WaitObjLoad(CPM_lnkNewContactCompanySearchResult1) 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkNewContactCompanySearchResult1,"Select the Company")
  WaitObjLoad(CPM_btnNewContactCheckMark)  
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnNewContactCheckMark,"Click on the checkmark icon")
  WaitObjLoad(CPM_txtSearchRecord)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_txtSearchRecord,"New contact is created")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_SearchContact
Parameters          : strFirstName,strLastName,strCompany - test data
Description         : Function to create a new contact
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_SearchContact(strFirstName)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Search Contact");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("4 - Verify data updated in web version and for the same record where applicable")  
  Click(CPM_txtSearchRecord) & Enter(CPM_txtSearchRecord,strFirstName,"Search the created Contact ["+strFirstName+"]")
  WaitObjLoad(CPM_lnkNewContactSearchResult1)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  VerifyPartialTextAriaLabel(CPM_lnkNewContactSearchResult1,strFirstName,"Verify the data is updated - New contact is created")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_DeleteContact
Parameters          : None
Description         : Function to Delete contact
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeleteContact()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Delete Contact") 
  Click(CPM_lnkNewContactSearchResult1,"Click on the contact")
  WaitObjLoad(CPM_btnContactEdit)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnContactEdit,"Click on Edit button")
  WaitObjLoad(CPM_btnContactEditDelete)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnContactEditDelete,"Click on Delete button")
  WaitObjLoad(CPM_btnDeleteConfirm)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnDeleteConfirm,"Click on Delete Confirm button")
  WaitObjLoad(CPM_btnContactBack)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnContactBack,"Click on Back button")
  Enter(CPM_txtSearchRecord,"","Clear the search")
  WaitObjLoad(CPM_btnNewContact)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_SearchRecord
Parameters          : None
Description         : Function to Search Record
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_SearchRecord(strSubject)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Search Record") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Enter(CPM_txtSearchRecord,strSubject,"Search the Record ["+strSubject+"]")
  WaitObjLoad(CPM_lnkRFISearchResult1) 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  VerifyPartialTextAriaLabel(CPM_lnkRFISearchResult1,strSubject,"Record is Found")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_DeleteRFI
Parameters          : None
Description         : Function to Delete RFI
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeleteRFI()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Delete RFI") 
  Click(CPM_lnkRFISearchResult1,"Click on the created RFI")
  WaitObjLoad(CPM_btnShowMenu)
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnShowMenu,"Click on Show Menu")
  WaitObjLoad(CPM_btnRFIDelete)
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnRFIDelete,"Click on Delete button")
  WaitObjLoad(CPM_btnDeleteConfirm)
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnDeleteConfirm,"Click on Delete Confirm button")
  WaitUntilToLoad()
  Sys.Keys("![Tab]^a[Del]") 
  WaitObjLoad(CPM_btnCreateRFI)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_SearchAndSelectRecord
Parameters          : None
Description         : Function to Search and Select Record
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_SearchAndSelectRecord(strSubject)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Search and select Record") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CPM_SearchRecord(strSubject)
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkRFISearchResult1,"Click on the searched Record")
  WaitObjLoad(CPM_btnLinkRelatedObjects)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_LinkRelatedObjects
Parameters          : None
Description         : Function to Link related objects
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_LinkRelatedObjects()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Link Related Objects")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjects,"Click on Link Related Objects")
  WaitObjLoad(CPM_btnLinkRelatedObjectsRFI)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjectsRFI,"Click on RFI for Link Related Objects")
  WaitObjLoad(CPM_btnLinkRelatedObjectsExisting)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjectsExisting,"Click on Existing")
  WaitObjLoad(CPM_lnkRFISearchResult1)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkRFISearchResult1,"Select an existing RFI to Link")
  WaitObjLoad(CPM_btnLinkRelatedObjectsCheckMark)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnLinkRelatedObjectsCheckMark,"Click on Check Mark to select the existing RFI to Link")
  WaitObjLoad(CPM_btnAddedRelatedObjectShowMenu)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_btnAddedRelatedObjectShowMenu,"Linked item is shown in the Related Objects strip")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_CreatePunchListItem()
Parameters          : None
Description         : Function to Create Punch List Item
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_CreatePunchListItem()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Create Punch List Item")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  var strDescription = "Desc_"+GetDateTimeStamp()
  var strNewPunchList = "NPL_"+GetDateTimeStamp()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  if(NotExists_WOLog(CPM_btnCreatePunchListItem) == true)
  {
    Click(CPM_btnPunchLists,"Click on Punch Lists",true);
  }
  WaitObjLoad(CPM_btnCreatePunchListItem)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnCreatePunchListItem,"Click on CREATE Punch Lists");
  WaitObjLoad(CPM_txtPunchListItemDescription)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Click(CPM_txtPunchListItemDescription,"Click on Description")
//  Sys.Keys("**********") 
//  EnterKey(CPM_txtPunchListItemDescription,"^a[Del]"+strDescription,"Enter the Description ["+strDescription+"]")
  Enter(CPM_txtPunchListItemDescription,strDescription,"Enter the Description ["+strDescription+"]")
//  WaitObjLoad(CPM_lnkSearchResult1)
//  Click(CPM_lnkSearchResult1)
//  Sys.Keys("[Enter]")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnPLAddContact,"Click Add Contact for 'To'")
//  WaitObjLoad(CPM_txtRFIAddContactSearch)  
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  if(NotExists_WOLog(CPM_txtRFIAddContactSearch) != true)
//  {
//    EnterKey_Contact(CPM_txtRFIAddContactSearch,strToContact,"Enter the Contact ["+strToContact+"] to Search")
//  }
  WaitObjLoad(CPM_lnkRFIContactSearchResult1) 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkRFIContactSearchResult1,"Select the Contact")
//  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  DblClickOnUIObject(CPM_dpdPunchList,"Click on Punch List field dropdown");
  WaitObjLoad(CPM_txtCreateNewPunchList)  
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_txtCreateNewPunchList,"A new window is opened where user can create a new punch list or select from the list shown.");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Click(CPM_txtCreateNewPunchList)
//  EnterKey(CPM_txtCreateNewPunchList,strNewPunchList,"Enter the New Punch List name ["+strNewPunchList+"]")
  Enter(CPM_txtCreateNewPunchList,strNewPunchList,"Enter the New Punch List name ["+strNewPunchList+"]")
  WaitObjLoad(CPM_btnCreateNewPunchList)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnCreateNewPunchList,"Click CREATE");
  WaitObjLoad(CPM_btnSave)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnSave,"Punch List saved and Message is displayed confirming the save: 'Punch List Item has been saved'.");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//--Return Value-------------------------------------------------------------------------------------------------------------------------------------------------
  return strDescription;
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_CreateIssue()
Parameters          : dictTestData - TestData
Description         : Function to Create Issue
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_CreateIssue(dictTestData)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Create Issue")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  var strSubject = "Subject_"+GetDateTimeStamp()
  var strStatus = dictTestData.Item("Status")
  var strSeverity = dictTestData.Item("Severity")
  var strType = dictTestData.Item("Type")
  var strToContact = dictTestData.Item("ToContact")
  var strTrade = dictTestData.Item("Trade")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  if(NotExists_WOLog(CPM_btnCreateIssue) == true)
  {
    WaitObjLoad(CPM_btnIssues)
    Click(CPM_btnIssues,"Click on Issues");
  }
  WaitObjLoad(CPM_btnCreateIssue)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnCreateIssue,"Click on CREATE Issue");
  WaitObjLoad(CPM_txtSubject)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Click(CPM_txtSubject1,"Click on Subject")
  Enter(CPM_txtSubject,strSubject,"Enter the Subject ["+strSubject+"]")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Enter(CPM_txtIssueStatus,strStatus,"Enter the Status ["+strStatus+"]")
//  EnterKey(CPM_txtIssueStatus,"")
  WaitObjLoad(CPM_lnkSearchResult1)
  Click(CPM_lnkSearchResult1)
  WaitObjLoad(CPM_txtIssueSeverity)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Enter(CPM_txtIssueSeverity,strSeverity,"Enter the Severity ["+strSeverity+"]")
//  EnterKey(CPM_txtIssueSeverity,"")
  WaitObjLoad(CPM_lnkSearchResult1)
  Click(CPM_lnkSearchResult1)
  WaitObjLoad(CPM_txtIssueType)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Enter(CPM_txtIssueType,strType,"Enter the Type ["+strType+"]")
//  EnterKey(CPM_txtIssueType,"")
  WaitObjLoad(CPM_lnkSearchResult1)
  Click(CPM_lnkSearchResult1)
  WaitObjLoad(CPM_btnRFIToAddContact)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnRFIToAddContact,"Click Add Contact for 'To'")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  if(NotExists_WOLog(CPM_txtRFIAddContactSearch) != true)
  {
    WaitObjLoad(CPM_txtRFIAddContactSearch)
    Enter(CPM_txtRFIAddContactSearch,strToContact,"Enter the Contact ["+strToContact+"] to Search")
  }
  WaitObjLoad(CPM_lnkSearchResult1) 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkSearchResult1,"Select the Contact")
  WaitObjLoad(CPM_txtIssueSeverity)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Enter(CPM_txtIssueTrade,strTrade,"Enter the Severity ["+strSeverity+"]")
  WaitObjLoad(CPM_btnSubmit)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnSubmit,"Click Submit")
  WaitObjLoad(CPM_txtSearchRecord)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//--Return Value-------------------------------------------------------------------------------------------------------------------------------------------------
  return strSubject;
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : EnterKey_Contact
Parameters          : strLogicalName - LogicalName(OR), strText - string, bolKeys - true or false
Description         : Function to enter text using Keystrokes in the textbox object
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function EnterKey_Contact(strLogicalName,strText,strLogTxt,strParent)
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
      var x = objUI.Left + objUI.Width / 2;
      var y = objUI.Top + objUI.Height / 2;
      
      objName = objUI.Name
      var strMessage = GetUIObjectDetails(objUI);
      
      Sys.Desktop.MouseDown(MK_LBUTTON,x,y)
      Delay(2000)
      objUI.Keys(strText)
      Delay(2000)
      Sys.Desktop.MouseUp(MK_LBUTTON,x,y)
      Delay(2000)
      Sys.Desktop.MouseDown(MK_LBUTTON,x,y)
      Delay(2000)
      objUI.Keys(strText)
      Delay(2000)
      Sys.Desktop.MouseUp(MK_LBUTTON,x,y)
      
      blnResult = true
      Log.Message("Text [ "+strText+" ] was entered in the field [ "+ strMessage + " ]")        
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
/*#######################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_AddNote()
Parameters          : None
Description         : Function to Add Note
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_AddNote()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Add Note")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  var strNote = "Note_"+GetDateTimeStamp()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Click(CPM_txtRFINotes)
//  EnterKey(CPM_txtRFINotes,strNote,"Add note ["+strNote+"]")
//  Sys.Keys("[Enter]")
  Enter(CPM_txtRFINotes,strNote,"Add note ["+strNote+"]")
  WaitObjLoad(CPM_lblRFIAddedNote) 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_lblRFIAddedNote,"User is able to add the Note")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_DeleteNote()
Parameters          : None
Description         : Function to Add Note
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeleteNote()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Delete Note")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Drag(CPM_lblRFIAddedNote,  535, 46, -452, 11,"Swipe left to delete the Note")
  WaitObjLoad(CPM_btnRFIDeleteNote)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnRFIDeleteNote,"Click Delete icon")
//  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  NotExists(CPM_lblRFIAddedNote,"User is able to delete the Note")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnSave,"Click SAVE");
//  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/



/*###############################################################################################################################################################
Function Name       : CPM_EmailReport
Parameters          : None
Description         : Function to Email Report
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_EmailReport(strRecord)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Delete Record")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage = Sys.Browser("chrome").Page("*")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Refresh the Browser to disable the EnableAccessibility button
  objPage.Keys("[F5]")
  WaitUntilToLoad()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.keys(strRecord)
  WaitUntilToLoad()
  Log.Message("Search Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Log.Enabled = false
  OCR.Recognize(objPage).BlockByText(aqDateTime.Today()).Click();
  Log.Enabled = true
//  objPage.Keys("![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab][Enter]")  
  WaitUntilToLoad()
  Log.Message("Open Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("[Tab][Tab][Tab][Enter]")
  WaitUntilToLoad()
  Log.Message("Email Report","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("[Tab][Tab][Tab][Tab][Enter]")
  WaitUntilToLoad()
  Log.Message("Email Details","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("[Tab][Tab][Enter]")
  Log.Message("Send Email Report","",pmNormal,"",objPage.Picture())
  WaitUntilToLoad()
  LogCheckPoint("Email Sent","CPM_DeleteRecord","")
  objPage.Keys("[F5]")
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  EnableFlutterAccessibility()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}

/*###############################################################################################################################################################
Function Name       : CPM_editExistingPunctListItem
Parameters          : None
Description         : Function to Search Record For Punch List
Return Value        : True or False 
Author              : Dhruv
Creation Date       : 06-June-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_editExistingPunctListItem(dictTestData,strDescription)
{
  var strDescription1 = dictTestData.Item("Description")
//----------------------------------------------------------------------------------------------------------------------------------------------
  CPM_SearchRecordPunchList(dictTestData,strDescription)
//------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkPunchListSearchResult1,"Select the searched Punch List")
  WaitObjLoad(CPM_txtPunchListItemDescription)
//------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_txtPunchListItemDescription,"Click on Description")
  EnterKey(CPM_txtPunchListItemDescription,strDescription1,"Enter the Description ["+strDescription+"]")
  WaitObjLoad(CPM_btnSave)
//------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnSave,"Punch List saved and Message is displayed confirming the save: 'Punch List Item has been saved'.");
//------------------------------------------------------------------------------------------------------------------------------------------------
  strDescription = strDescription+strDescription1
  CPM_SearchRecordPunchList(dictTestData,strDescription)
//------------------------------------------------------------------------------------------------------------------------------------------------
}

/*###############################################################################################################################################################
Function Name       : CPM_SearchRecord
Parameters          : None
Description         : Function to Search Record
Return Value        : True or False 
Author              : Dhruv
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_SearchRecordPunchList(dictTestData,strDescription,strVerificationType)
{
  var strVerification = dictTestData.Item("InvalidVerification")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Search Record")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  WaitObjLoad(CPM_txtSearchRecord)

  if(aqString.ToLower(strVerificationType)=="invalid")
  {
    Click(CPM_txtSearchRecord)
    Sys.Keys("**********^a[Del]"+strDescription+strVerificationType)
    Log.Message("Search the Record ["+strDescription+"Invalid]")
    //Enter(CPM_txtSearchRecord,strDescription+strVerificationType,"Search the Record ["+strDescription+"Invalid"+"]")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
    VerifyPartialTextAriaLabel(CPM_lblProjectNoRecordsFound,strVerification,"Verified Invalid Punch List Search 'No Records Found'")
  }
  else
  {
    Click(CPM_txtSearchRecord)
    Sys.Keys("**********^a[Del]"+strDescription)
    Log.Message("Search the Record ["+strDescription+"]")
    //Enter(CPM_txtSearchRecord,strDescription,"Search the Record ["+strDescription+"]")
    WaitObjLoad(CPM_lnkPunchListSearchResult1)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
    VerifyPartialTextAriaLabel(CPM_lnkPunchListSearchResult1,strDescription,"Record is Found")
  }
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/


/*###############################################################################################################################################################
Function Name       : CPM_DeletePunchList
Parameters          : None
Description         : Function to Delete PunchList
Return Value        : True or False 
Author              : Chethana Ramaswamy
Creation Date       : 07-June-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeletePunchList(strPunchList)
{
 //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage = Sys.Browser("chrome").Page("*")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Refresh the Browser to disable the EnableAccessibility button
  objPage.Keys("[F5]")
  WaitUntilToLoad()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.keys(strPunchList)
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("![Tab]![Tab]![Tab]![Tab]![Tab]![Tab][Enter]")  
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("[Tab][Tab][Tab][Enter]")
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("![Tab][Enter]")
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("[Tab][Tab][Tab][Enter]")
  WaitUntilToLoad()
  objPage.Keys("[F5]")
  WaitUntilToLoad()
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : CPM_AttachFle()
Parameters          : None
Description         : Function to CPM Attach File
Return Value        : True or False 
Author              : Chethana Ramaswamy
Creation Date       : 06-June-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_AttachFile(strRecord,strFileName,strFileNameVerify)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Attach a File")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  blnResult = false
  strFilePath = ProjectSuite.Path+"TestData\\"+strFileName
  objPage = Sys.Browser("chrome").Page("*")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Refresh the Browser to disable the EnableAccessibility button
  objPage.Keys("[F5]")
  WaitUntilToLoad()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.keys(strRecord)
  WaitUntilToLoad()
  Log.Message("Search Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Log.Enabled = false
  SetBrowserZoom75()
  OCR.Recognize(objPage).BlockByText(aqDateTime.Today()).Click();
  Log.Enabled = true
  WaitUntilToLoad()
  WaitUntilToLoad()
  WaitUntilToLoad()
  Log.Message("Open Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  OCR.Recognize(objPage).BlockByText("Add Attachments").Click();
  Log.Message("Click Add Attachments","",pmNormal,"",objPage.Picture())
  OCR.Recognize(objPage).BlockByText("Device Library").Click();
  Log.Message("Choose Device Library","",pmNormal,"",objPage.Picture())
  OCR.Recognize(objPage).BlockByText("browse").Click();
  Log.Message("Browser for file to Attach","",pmNormal,"",objPage.Picture())
  Delay(2000)
  Sys.Keys(strFilePath+"[Enter]")
  Delay(2000)
  OCR.Recognize(objPage).BlockByText("Upload",spRightMost).Click();
  WaitUntilToLoad()
  Log.Message("Upload file","",pmNormal,"",objPage.Picture())
  WaitUntilToLoad()
  if(OCR.Recognize(objPage).BlockByText(strFileNameVerify).Text == strFileNameVerify == true)
  {
    blnResult = true
  }
  SetBrowserZoom100()
  writeLogline("File Attached","CPM_AttachFile","",blnResult)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}


function CPM_AttachFle_OLD(strFileName)
{  
  var blnResult = false
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Click on Attachments.")  
  Click(CPM_btnAttachFile,"Click on Add Attachments Button")
  WaitObjLoad(CPM_lnkDeviceLibrary)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkDeviceLibrary,"Click on Device Library Link" )
  WaitObjLoad(CPM_lnkBrowseFile)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------   
  Click(CPM_lnkBrowseFile,"Click to Browse" )
  var objXlFilePath = ProjectSuite.Path+"TestData\\"+strFileName
  Sys.Keys(objXlFilePath+"[Enter]")
  WaitObjLoad(CPM_btnUpload)
//--------------------------------------------------------------------------------------------------------------------------------------------------------------- 
  Click(CPM_btnUpload,"Click on Upload Button" )
  blnResult = true 
//--------------------------------------------------------------------------------------------------------------------------------------------------------------- 
  CloseFolder();
  return blnResult;
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : CPM_DeleteAttachment()
Parameters          : None
Description         : Function to Delete the attachment
Return Value        : True or False 
Author              : Chethana Ramaswamy
Creation Date       : 07-June-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeleteAttachment()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("2 - Click on the added related object")  
  Click(CPM_btnAddedAttachedObjectShowMenu,"Click on show menu of the added related object")
  WaitObjLoad(CPM_btnDeleteConfirm)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_btnDeleteConfirm,"User is able to see Delete option")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("3 - Click on Delete button to  delete the object from related object stripe")  
  Click(CPM_btnDeleteConfirm,"Click on Delete button to  delete the object from related object stripe")
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  NotExists(CPM_btnDeleteConfirm,"User is unable to Unlink the added object")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/
/*###############################################################################################################################################################
Function Name       : CPM_UnlinkAttachment()
Parameters          : None
Description         : Function to UNlink attachment
Return Value        : True or False 
Author              : Chethana Ramaswamy
Creation Date       : 07-June-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_UnlinkDeleteAttachment(strRecord,strAction)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder(strAction+" Attached Object")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage = Sys.Browser("chrome").Page("*")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Refresh the Browser to disable the EnableAccessibility button
  objPage.Keys("[F5]")
  WaitUntilToLoad()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.keys(strRecord)
  WaitUntilToLoad()
  Log.Message("Search Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Log.Enabled = false
  SetBrowserZoom75()
  OCR.Recognize(objPage).BlockByText(aqDateTime.Today()).Click();
  Log.Enabled = true
//  objPage.Keys("![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab][Enter]")  
  WaitUntilToLoad()
  WaitUntilToLoad()
  WaitUntilToLoad()
  Log.Message("Open Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("![Tab]![Tab][Enter]")
  WaitUntilToLoad()
  Log.Message("Open Show Menu of the Attached Object to "+strAction,"",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  OCR.Recognize(objPage).BlockByText(strAction).Click();
  Log.Message("Click "+strAction+" and Confirm "+strAction,"",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("![Tab][Enter]")
  SetBrowserZoom100()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Log.Enabled = false
  if(OCR.Recognize(objPage).BlockByText(strAction).Text == strAction == false)
  {
    blnResult = true
  }
  SetBrowserZoom100()
  Log.Enabled = true
  writeLogline("File "+strAction,"CPM_UnlinkDeleteAttachment","",blnResult)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}

function CPM_UnlinkAttachment_OLD()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("2 - Click on the attached object")  
  Click(CPM_btnAddedAttachedObjectShowMenu,"Click on show menu of the added Attached object")
  WaitObjLoad(CPM_btnAddedRelatedObjectUnlink)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_btnAddedRelatedObjectUnlink,"User is able to see Unlink option")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("3 - Click on Unlink to remove related object from related onject stripe")  
  Click(CPM_btnAddedRelatedObjectUnlink,"Click on Unlink to remove related object from related object stripe")
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  NotExists(CPM_btnAddedRelatedObjectUnlink,"User is unable to Unlink the added object")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : CPM_CopyPunchList
Parameters          : None
Description         : Function to Copy the Existing punch List
Return Value        : True or False 
Author              : Chethana Ramaswamy
Creation Date       : 07-June-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_CopyPunchList()
{
  var strExistingPunchList = "Desc_DJun072024T71722"
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Copy PunchList")  
  WaitObjLoad(CPM_btnShowMenu)
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnShowMenu,"Click on Show Menu")
  WaitObjLoad(CPM_lnkCopy)
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkCopy,"Click on Copy button")
  WaitObjLoad(CPM_txtPunchListItemDescription)
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  strDescription = strExistingPunchList+ "_Edited"
  EnterKey(CPM_txtPunchListItemDescription,strDescription,"Enter the Description ["+strDescription+"]")
  Click(CPM_btnNewPunchListSave,"Save button is Clicked") 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : SelectAndVerifyFilter()
Parameters          : dictTestData
Description         : Function to Select And Verify Filter
Author              : Dhruv Aggarwal
Creation Date       : 11-June-2024
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function SelectAndVerifyFilter(dictTestData)
{

  var strFilterName =  dictTestData.Item("FilterName") 
  var strFilterValue = dictTestData.Item("FilterValue")
  var strGroupBy = dictTestData.Item("GroupBy")
//---------------------------------------------------------------------------------------------
  CPM_SelectPunchListFilter = "//*[@aria-label = '"+strFilterName+"' and @role='button']|//*[text() = '"+strFilterName+"' and @role='button']"
  CPM_SelectFilterValue = "//*[contains(@aria-label , '"+strFilterValue+"')]|//*[contains(text() , '"+strFilterValue+"')]"
  CPM_VerifyFilter = "//*[contains(@aria-label, '"+strFilterValue+"')]"
  CPM_Filter_btnDone = "//*[text() = 'Done' and @role='button']|//*[@aria-label = 'Done' and @role='button']"

//---------------------------------------------------------------------------------------------
    if(NotExists_WOLog(CPM_btnCreatePunchListItem) == true)
  {
    Click(CPM_btnPunchLists,"Click on Punch Lists");
  }
//---------------------------------------------------------------------------------------------
  WaitObjLoad(CPM_SelectPunchListFilter)
  Click(CPM_SelectPunchListFilter,"Click on { "+strFilterName+" } Filter");
//---------------------------------------------------------------------------------------------
  WaitObjLoad(CPM_SelectFilterValue)
  Click(CPM_SelectFilterValue,"Click on { "+strFilterValue+" } value from filter");
//---------------------------------------------------------------------------------------------

  if(!NotExists_WOLog(CPM_Filter_btnDone) == true)
  {
    Click(CPM_Filter_btnDone,"Click On Button Done");
  }
//---------------------------------------------------------------------------------------------
  WaitObjLoad(CPM_VerifyFilter)
  Exists(CPM_VerifyFilter,"Filter Added Successfully");
//---------------------------------------------------------------------------------------------
}

/*###############################################################################################################################################################
Function Name       : CPM_CreateChecklist()
Parameters          : None
Description         : Function to CreateCheckList Item
Return Value        : True or False 
Author              : Chethana Ramaswamy
Creation Date       : 11-June-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_CreateChecklist(dictTestData)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
    var strToContact = dictTestData.Item("ToContact")
    var strType = dictTestData.Item("Type") 
    var strChecklistType = dictTestData.Item("CheckListType")
    var strCheckListNumber   
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Create Check list Item")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnCheckList,"Click on Check Lists");   
  WaitObjLoad(CPM_btnCreateChecklist)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnCreateChecklist, "Click on Create Checklist Button")
  objPage = GetCurrentPageObject_WO_Validation()
  OCR.Recognize(objPage).BlockByText(strChecklistType).Click(); 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnAddContact , "Click on Add Contact button")
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------  
  if(NotExists_WOLog(CPM_txtRFIAddContactSearch) != true)
  {
    Click(CPM_txtRFIAddContactSearch) 
    EnterKey_Contact(CPM_txtRFIAddContactSearch,strToContact,"Enter the Contact ["+strToContact+"] to Search")
  }
  WaitObjLoad(CPM_lnkRFIContactSearchResult1) 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_lnkRFIContactSearchResult1,"Select the Contact")
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_dpdChecklistType) 
  delay2k()
  OCR.Recognize(objPage).BlockByText("Project").Click();
  delay2k()
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  //Click(CPM_btnShowMenu,"Click on Show Menu")
  WaitObjLoad(CPM_btnSubmit)
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnSubmit,"Click on Submit button") 
  WaitObjLoad(CPM_CheckListSubmittedStatus)   
  Exists(CPM_CheckListSubmittedStatus, "Checklist Submitted Sucessfully")
//---------------------------------------------------------------------------------------------------------------------------------------------------------  
  Click(CPM_lnkRFISearchResult1,"Click on the Created CheckList")//Extract the Chcecklist number
  WaitObjLoad(CPM_CheckListNumber)
  strCheckListNumber = GetText(CPM_CheckListNumber,"Extract CheckListNumber")[1].split(" ")[2]  
  dictTestData.Add("CheckListNumber", strCheckListNumber)  //Checklist number is added to DictTestData
//---------------------------------------------------------------------------------------------------------------------------------------------------------  
  CloseFolder();  
}

/*###############################################################################################################################################################
Function Name       : CPM_SubmitCheckList
Parameters          : None
Description         : Function to Submit theCheckList
Return Value        : True or False 
Author              : Chethana Ramaswamy
Creation Date       : 11-June-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_SubmitCheckList(){
//--------------------------------------------------------------------------------------------------------------------------------------------------------------- 
  CreateStepFolder("Submit the Checklist");
//--------------------------------------------------------------------------------------------------------------------------------------------------------------- 
  Click(CPM_btnSubmit, "Click Submit Button")
  WaitObjLoad(CPM_btnCreateChecklist) 
//--------------------------------------------------------------------------------------------------------------------------------------------------------------- 
  VerifyPartialTextAriaLabel(CPM_lnkRFISearchResult1,"SUBMITTED","Record is Found")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}

/*###############################################################################################################################################################
Function Name       : CPM_DeleteCheckList
Parameters          : None
Description         : Function to Delete PunchList
Return Value        : True or False 
Author              : Chethana Ramaswamy
Creation Date       : 07-June-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeleteCheckList()
{
 //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage = Sys.Browser("chrome").Page("*")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Refresh the Browser to disable the EnableAccessibility button
  objPage.Keys("[F5]")
  WaitUntilToLoad()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab]![Tab][Enter]")  
  WaitUntilToLoad()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("[Tab][Tab][Tab][Enter]")
  delay2k();  
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage = GetCurrentPageObject_WO_Validation()  
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  OCR.Recognize(objPage).BlockByText("Delete").Click()
  objPage = Sys.Browser("chrome").Page("*")
  objPage.Keys("[Tab][Tab][Tab][Enter]")
  WaitUntilToLoad()
}

/*###############################################################################################################################################################
Function Name       : VerifyMinePunchListData
Parameters          : None
Description         : Select the Mini button in Checklist and verifying data
Return Value        : None 
Author              : Naresh
Creation Date       : July-2024
###############################################################################################################################################################*/
function VerifyMinePunchListData(){
  try{
    
    if(NotExists_WOLog(CPM_btnCreatePunchListItem) == true){
      Click(CPM_btnPunchLists,"Click on Punch Lists");
    }
  
    UserName =aqString.ToUpper( Project.Variables.UserID)
    var blnResult;
    
    //------------------------------------------------------------------------------------------------------------------------
    Click(PunchList_MineButton,"Click Mine button")
    WaitObjLoad(PunchList_tableCell)
    objList = GetUIObjects(PunchList_tableCell)
    //------------------------------------------------------------------------------------------------------------------------
    for(var i=0;i<objList.length;i++){
      rowdata = aqString.Replace(objList[i].contentText, " ", "");
      if(aqString.Find(rowdata,UserName,0,false)!=-1){
        blnResult = true;
      }else{
        blnResult = false;
      }
     writeLogline(UserName+" User Data is displayed : "+objList[i].contentText,"compare","",blnResult)
   }
   
   }catch(e){
     writeLogline(" Failed in VerifyMineCheckListData "+e.message,"Failed","",false)
   }
}

/*###############################################################################################################################################################
Function Name       : VerifySelectedFavIconMovedToTop
Parameters          : None
Description         : Verifying the Selected Favourite Icon item moved to top on the list
Return Value        : None 
Author              : Naresh
Creation Date       : July-2024
###############################################################################################################################################################*/
function VerifySelectedFavIconMovedToTop(){
    EnableFlutterAccessibility() 
    
    objPage = GetCurrentPageObject_WO_Validation()
    oldChecklistTypeList = GetUIObjects(Checklist_Types)
    //------------------------------------------------------------------------------------------------------------------------
    Log.Message("Before selecting Fav Icon")
    var oldArray=[];
    for(var i =0;i < oldChecklistTypeList.length; i++ ){
      objText = oldChecklistTypeList[i].outerHTML;
      strList= objText.split("=")
      for(var j =0; j< strList.length ; j++){
        if(aqString.Find(strList[j],"aria-label",0,false)!=-1){
          oldArray.push(strList[j+1])
          Log.Message(strList[j+1])
          break;
        }
      }
    }
    //------------------------------------------------------------------------------------------------------------------------
    objChecklistFavIconList = GetUIObjects(Checklist_Types+Checklist_FavIcon)
    objFavIcon = objChecklistFavIconList[objChecklistFavIconList.length-1] 
    objFavIcon.Click()
    //------------------------------------------------------------------------------------------------------------------------
    writeLogline("Selected Last Fav Icon item ","","",true)
    Log.Message("After selecting Fav Icon")
    WaitUntilToLoad()
    newChecklistTypeList = GetUIObjects(Checklist_Types)
    //------------------------------------------------------------------------------------------------------------------------
    var NewArray=[];
    for(var i =0;i < newChecklistTypeList.length; i++ ){
      objTextList = newChecklistTypeList[i].outerHTML
      strList = objTextList.split("=")
      for(var j =0; j< strList.length ; j++){
        if(aqString.Find(strList[j],"aria-label",0,false)!=-1){
          NewArray.push(strList[j+1])
          Log.Message(strList[j+1])
          break;
        }
      }
    }
   //------------------------------------------------------------------------------------------------------------------------
   if(oldArray[0]!=NewArray[0] ){
     blnResult = true;
   }else{
     blnResult = false
   }
   writeLogline("Previous Top Value is "+oldArray[0]+" and Now "+NewArray[0] +" Check list Fav Icon is moved to top ","","",blnResult)
}

/*###############################################################################################################################################################
Function Name       : CPM_DeleteRelatedObject()
Parameters          : None
Description         : Function to Delete Related Object
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeleteRelatedObject(strRecord)
{ 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Delete Related Object")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage = Sys.Browser("chrome").Page("*")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Refresh the Browser to disable the EnableAccessibility button
  objPage.Keys("[F5]")
  WaitUntilToLoad()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.keys(strRecord)
  WaitUntilToLoad()
  Log.Message("Search Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Log.Enabled = false
  SetBrowserZoom75()
  OCR.Recognize(objPage).BlockByText(aqDateTime.Today()).Click();
  Log.Enabled = true
  WaitUntilToLoad()
  WaitUntilToLoad()
  Log.Message("Open Record ["+strRecord+"]","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  OCR.Recognize(objPage).BlockByText("Subject").Click();
  Log.Message("Open Related Object","",pmNormal,"",objPage.Picture())
  WaitUntilToLoad()
  objPage.Keys("[Tab][Tab][Tab][Enter]")
  Log.Message("Open Show Menu of the Related Object to Delete","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  OCR.Recognize(objPage).BlockByText("Delete").Click();
  Log.Message("Click Delete and Confirm Delete","",pmNormal,"",objPage.Picture())
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage.Keys("![Tab]![Tab][Enter]")
  SetBrowserZoom100()
  WaitUntilToLoad()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  EnableFlutterAccessibility()
  NotExists_WOLog(CPM_btnAddedRelatedObjectUnlink,"User is able to Delete the related object")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}

/*###############################################################################################################################################################
Function Name       : UpdateCheckListAndVerify()
Parameters          : strCheckListNo
Description         : Update checklist data and verify
Return Value        : True or False 
Author              : Naresh
Creation Date       : Jul-2024
###############################################################################################################################################################*/
function UpdateCheckListAndVerify(strCheckListNo){
  Click(CheckListTab,"Click CheckList Tab ")
  var alreadySelected=false ;
  WaitObjLoad(CheckListTabYesCheckBox)
  objCheckBox  = GetUIObject(CheckListTabYesCheckBox)
  //-----------------------------------------------------------------------------------------------------------------
  if(aqString.Find(objCheckBox.outerHTML,'aria-checked="true"',0,false)!=-1){
    alreadySelected=true
  }else{
    alreadySelected= false;
  }
  Click(CheckListTabYesCheckBox,"click yes option CheckBox")
  //-----------------------------------------------------------------------------------------------------------------
  Click(SaveBtn,"Click on Save button")
  Click(SaveBtn,"Click on Save button")
  WaitObjLoad(CPM_btnCreateChecklist)
  //------------------------------------------------------------------------------------------------------------------------- 
  CheckListItem = "//*[contains(@aria-label,'"+strCheckListNo+"') and @role='group']"
  Click(CheckListItem,"Click Check List Item")
  //-------------------------------------------------------------------------------------------------------------------------
  WaitObjLoad(CheckListTab)
  Click(CheckListTab,"Click CheckLab Tab ")
  //-----------------------------------------------------------------------------------------------------------------
  objCheckBox  = GetUIObject(CheckListTabYesCheckBox)
  if(!alreadySelected && aqString.Find(objCheckBox.outerHTML,'aria-checked="true"',0,false)!=-1){
    blnResult=true
  }else if(alreadySelected && aqString.Find(objCheckBox.outerHTML,'aria-checked="false"',0,false)!=-1){
    blnResult= true;
  }else{
    blnResult=false
  }
  //-----------------------------------------------------------------------------------------------------------------
  writeLogline("Updated Checklist Tab option value ","Exists","",blnResult)
}

/*###############################################################################################################################################################
Function Name       : NavigateToCheckListDetailsPage()
Parameters          : 
Description         : Navigate to checklist detail page
Return Value        : strCheckListNo 
Author              : Naresh
Creation Date       : Jul-2024
###############################################################################################################################################################*/
function NavigateToCheckListDetailsPage(){
 try{ 
    Click(CPM_btnCheckList,"Click on Check Lists");   
    WaitObjLoad(CPM_btnCreateChecklist)
    //-----------------------------------------------------------------------------------------------------
    Click(CheckListItem, "Click Check List Item")
    WaitObjLoad(CheckListTab)
    //-----------------------------------------------------------------------------------------------------
    CheclikstItem =  GetText(CheckListHeader)[1]
    strCheckListNo = CheclikstItem.split(" ")[2]
    return strCheckListNo;
  }catch(e){
    writeLogline("Failed in NavigateToCheckListDetailsPage :"+e.message,"Exception","",false)
  }
}
  
/*###############################################################################################################################################################
Function Name       : CreateCheckListNoteAndVerify()
Parameters          : strCheckListNo,strNoteValue
Description         : Create Check list note and verify
Return Value        :  
Author              : Naresh
Creation Date       : Jul-2024
###############################################################################################################################################################*/
function CreateCheckListNoteAndVerify(strCheckListNo,strNoteValue){
  try{
    EnableFlutterAccessibility()  
//    WaitObjLoad(CheckListTab)
//    Click(CheckListTab,"Click CheckLab Tab ")
    //-------------------------------------------------------------------------------------------------------------------------
    WaitObjLoad(CheckListNoteTextBox)
    Click(CheckListNoteTextBox,"Click Note Text box")
    Enter(CheckListNoteTextBox,strNoteValue,"Enter Note text box value")
    Sys.Keys("[Tab]")
    delay3k()
    //-------------------------------------------------------------------------------------------------------------------------
    objButtonList = GetUIObjects(NoteSendBtn)
    objButtonList[objButtonList.length-1].Click()
//    Click(NoteSendBtn, "Clicked Note send icon" )
    WaitObjLoad(SaveBtn)
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
    Click(SaveBtn,"Click on Save button")
    aqUtils.Delay(15000,"waiting for reload objects")
    Sys.Refresh()
    if(!NotExists_WOLog(SaveBtn)){
      Click(SaveBtn,"Click on Save button")
    }
    WaitObjLoad(CPM_btnCreateChecklist)
    //-------------------------------------------------------------------------------------------------------------------------
    
    CheckListItem = "//*[contains(@aria-label,'"+strCheckListNo+"') and @role='group']"
    Click(CheckListItem,"Click Check List Item")
    //-------------------------------------------------------------------------------------------------------------------------
    WaitObjLoad(CheckListTab)
    UpdatedNote = "//*[contains(@aria-label,'"+strNoteValue+"')]"
    Exists(UpdatedNote,"Existed the updated note")
  }catch(e){
    writeLogline("Failed in CreateCheckListNoteAndVerify ","Exception","",false)
  }
}


/*###############################################################################################################################################################
Function Name       : CPM_OpenDrawingTab
Parameters          : None
Description         : Function to Open Drawing Tab
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_OpenDrawingTab()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Open Drawing Tab") 
  Click(CPM_btnDrawings,"Go to the Drawings tab")
  WaitObjLoad(CPM_grdDrawingsThumbnailViewResult1)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_grdDrawingsThumbnailViewResult1,"Drawing Tab is loaded successfully")  
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : CPM_OpenDrawing
Parameters          : None
Description         : Function to Open a Drawing
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_OpenDrawing()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Open a Drawing") 
  CPM_OpenDrawingTab()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_grdDrawingsThumbnailViewResult1,"Open the drawing")
  Click(CPM_DrawingNext)
  WaitObjLoad(CPM_btnDrawingsOpenedDrawing,CPM_iFrameDrawing)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_btnDrawingsOpenedDrawing,"Drawing is opened without any errors",CPM_iFrameDrawing)  
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : CPM_GotToListView
Parameters          : None
Description         : Function to Go to list view
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_GoToListView()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Go to List View") 
  Click(CPM_btnDrawingsListview,"Click on the List View icon")
  WaitObjLoad(CPM_grdDrawingsListViewResult1)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_grdDrawingsListViewResult1,"User is able to see Drawings in List View")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : CPM_GoToThumbnailView
Parameters          : None
Description         : Function to Go to thumbnail view
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_GoToThumbnailView()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Go to Thumbnail View") 
  Click(CPM_btnDrawingsThumbnailview,"Click on the Thumbnail View icon")
  WaitObjLoad(CPM_grdDrawingsThumbnailViewResult1)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Exists(CPM_grdDrawingsThumbnailViewResult1,"User is able to see Drawings in Thumbnail View") 
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : CPM_SimulateKeyboardKeyOnDrawing
Parameters          : None
Description         : Function to simulate keyboard key
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_SimulateKeyboardKeyOnDrawing(strKey)
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Simulating Keyboard click key : "+strKey) 
  Sys.Keys(strKey)
  Log.Message("Simulated Keyboard action of clicking key - "+strKey)
  Delay(2000)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Click(CPM_btnDrawingsOpenedDrawing,"Tap on Drawing",CPM_iFrameDrawing)
  Delay(2000)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : CPM_DeleteAnnotationOnDrawing
Parameters          : None
Description         : Function to Delete Anootation on Drawing
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeleteAnnotationOnDrawing()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Delete Annotation") 
  Sys.Keys("[Del]")
  Log.Message("Simulated [Del] key keboard action")
  Delay(2000)
  Click(CPM_btnDeleteConfirm,"Confirm Delete")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : CPM_DeleteTextAnnotationOnDrawing
Parameters          : None
Description         : Function to Delete Text Annotation on Drawing
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeleteTextAnnotationOnDrawing()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Delete Text Annotation") 
  Click(CPM_btnDrawingsTextAnnotation,CPM_iFrameDrawing) //Selecting and delelting is not working in first attempt, ensuring to keep the focus
  Click(CPM_btnDrawingsMeasurement)
  Click(CPM_btnDrawingsTextAnnotation,CPM_iFrameDrawing)
  CPM_DeleteAnnotationOnDrawing()
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/

/*###############################################################################################################################################################
Function Name       : CPM_DeleteArrowAnnotationOnDrawing
Parameters          : None
Description         : Function to Delete Text Annotation on Drawing
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
###############################################################################################################################################################*/
function CPM_DeleteArrowAnnotationOnDrawing()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Delete Text Annotation") 
  Click(CPM_btnDrawingsArrowAnnotation,CPM_iFrameDrawing) //Selecting and delelting is not working in first attempt, ensuring to keep the focus
  CPM_DeleteAnnotationOnDrawing()
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}

/*###############################################################################################################################################################
Function Name       : NavigateToChecklist
Parameters          : strIssueType
Description         : this function used to selecting checklist item and navigate to checklist Tab and select issue type
Return Value        : strCheckListNo 
Author              : Naresh
Creation Date       : Jul-2024
###############################################################################################################################################################*/
function NavigateToChecklist(strIssueType){
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Create Issue using Checklist")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  objPage = Sys.Browser("chrome").Page("*")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  WaitUntilToLoad()
  WaitUntilToLoad()
 //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Log.Enabled = false
  SetBrowserZoom75()
  
  objPage = Sys.Browser("chrome").Page("*")
  OCR.Recognize(objPage).BlockByText("Checklists").Click();
  WaitUntilToLoad() 
  
  OCR.Recognize(objPage).BlockByText(aqDateTime.Today()).Click();
  Log.Enabled = true
  WaitUntilToLoad()
  WaitUntilToLoad()
  Log.Message("Open Record","",pmNormal,"",objPage.Picture())
  SetBrowserZoom100()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  OCR.Recognize(objPage).BlockByText("CHECKLIST",spRightMost).Click();
  WaitUntilToLoad()
  strCheckListNo = OCR.Recognize(objPage).BlockByText("Checklists ").Text.split(' ')[1]
  OCR.Recognize(objPage).BlockByText("Yes").Click();
  WaitUntilToLoad()
  WaitUntilToLoad()
  OCR.Recognize(objPage).BlockByText("Expand").Click();
  WaitUntilToLoad()
  OCR.Recognize(objPage).BlockByText("Link Related Objects").Click();
  
  WaitUntilToLoad()
  if(OCR.Recognize(objPage).BlockByText(strIssueType).Text == strIssueType){
    Log.Checkpoint(strIssueType+" button is displayed")
  }
  OCR.Recognize(objPage).BlockByText(strIssueType).Click();
  
  Log.Message("Open Show Menu of the Related Object to Unlink","",pmNormal,"",objPage.Picture())
  
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
  return strCheckListNo;
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}

/*###############################################################################################################################################################
Function Name       : CreateNewIssueInCheckList
Parameters          : strIssueType
Description         : this function used to Create a new issue from checklist tab
Return Value        : strSubject 
Author              : Naresh
Creation Date       : Jul-2024
###############################################################################################################################################################*/
function CreateNewIssueInCheckList(strSubject  ){
  try{
    
//    WaitObjLoad(SubmitButton)
    objPage = GetCurrentPageObject_WO_Validation()
    //-----------------------------------------------------------------------------------------------------------------------------------------
    Sys.Keys(strSubject+"[Tab]")
    WaitUntilToLoad()
    writeLogline("Enter Subject text box ","","",true)
    //-----------------------------------------------------------------------------------------------------------------------------------------
    Sys.Keys("[Down][Tab][Tab][Enter]")
    writeLogline("Enter Status text box ","","",true)
    WaitUntilToLoad()
    //-----------------------------------------------------------------------------------------------------------------------------------------
    OCR.Recognize(objPage).BlockByText("Type*").Click();
    delay3k()
    //-----------------------------------------------------------------------------------------------------------------------------------------
    Sys.Keys("[Down][Tab][Tab][Enter]")
    delay3k()
    writeLogline("Enter Issue type text box ","","",true)
     OCR.Recognize(objPage).BlockByText("Add Contact").Click();
     WaitUntilToLoad()
     Sys.Keys("[Down][Tab][Enter]")
      WaitUntilToLoad()
      
    //-----------------------------------------------------------------------------------------------------------------------------------------
    OCR.Recognize(objPage).BlockByText("SUBMIT").Click();
    WaitUntilToLoad()
    EnableFlutterAccessibility()
    WaitUntilToLoad()
    //---------------------------------------------------------------------------------------------------------------------------------
    NotExists(ErrorDismissButton,"Error message is not displayed")

    backButton ="//*[@role='heading' and contains(text(),'Checklist')]//..//*[@role='button']"
    Click(backButton,"Click back button")
    WaitUntilToLoad()
    Click(SaveBtn)
    WaitUntilToLoad()
  }catch(e){
    writeLogline("Failed in  CreateNewIssueInCheckList "+e.message,"error","",false)
  }
}


function VerifyIssueInCheckList(strCheckListNo,Subject){
  
    CheckListItem = "//*[contains(@aria-label,'"+strCheckListNo+"') and @role='group']"
    Click(CheckListItem,"Click Check List Item")
    //-------------------------------------------------------------------------------------------------------------------------
    WaitObjLoad(CheckListTab)
    
    IssuesTab = "//*[@role='text' and contains(text(),'ISSUES')]"
    Click(IssuesTab,"Click Issue Tab")
    WaitUntilToLoad()
    //-----------------------------------------------------------------------------------------------------------------------------------------
    IssuesListItem = "//*[@role='text' and contains(text(),'"+Subject+"')]"
    Exists(IssuesListItem,"Exists issue list item "+Subject)
 }


 
 
//--------Construct PM App Versions validation POC ------------

function CPM_GetCurrAppVersion()
{
//------------------------------------------------------------------------------------------------------------------------------------------------------
//    CreateStepFolder("Get the Current App Version from Application");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//    Click(CPM_btnNavigationDrawerIcon,"Open Menu");
    Click(CPM_btnNavigationDrawerIcon)
    WaitObjLoad(CPM_btnSettings)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//    Click(CPM_btnSettings,"Click Settings");
    Click(CPM_btnSettings)
    WaitObjLoad(CPM_dpdAbout)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//    Click(CPM_dpdAbout,"Click About");
    Click(CPM_dpdAbout)
    WaitObjLoad(CPM_lblAppVersion)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//    var CurrAppVersion = GetText(CPM_lblAppVersion,"Get Current App Version from Application")[1];
    var CurrAppVersion = GetText(CPM_lblAppVersion)[1]
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//    CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//    Log.Message("Current "+ CurrAppVersion)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
    return CurrAppVersion
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}


function ValidateConstructPMAppVersion()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Project.Variables.ClearCache = false
  var arrEnvironments = ProjectSuite.Variables.EnvironmentString.split(",")
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  for(i=0;i<arrEnvironments.length;i++)
  {
    ProjectSuite.Variables.Environment = aqConvert.StrToInt(arrEnvironments[i])
    Project.Variables.URL = GetApplicationURL(ProjectSuite.Variables.Environment)+ProjectSuite.Variables.ConstructPM
    var strPath = Project.Variables.ConstructPMVersionsExcelPath
    var strSheet = Project.Variables.ConstructPMVersionsExcelSheetName
    var strColumn = 2
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    switch(ProjectSuite.Variables.Environment)
    {
      case 6:
        var strRow = 3
        CreateStepFolder("Environment: QALatest")
        break
      case 7:
        var strRow = 6
        CreateStepFolder("Environment: QADaily")
        break
      case 9:
        var strRow = 9
        CreateStepFolder("Environment: QADaily2")
        break
    }
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    CMiC_LoginDirectURL()
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    EnableFlutterAccessibility()
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    var PrevAppVer = ReadDataInExcelCell(strPath,strSheet,strColumn,strRow)
    Log.Message("Previous "+PrevAppVer)
    var CurrAppVer = CPM_GetCurrAppVersion()
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    if(CurrAppVer>PrevAppVer)
    {
      Log.CheckPoint("Current "+CurrAppVer+" is Higher than Previous "+PrevAppVer)
      WriteDataInExcelCell(strPath,strSheet,strColumn,strRow,CurrAppVer)
    }
    else if(CurrAppVer==PrevAppVer)
    {
      Log.CheckPoint("Current "+CurrAppVer+" is same as Previous "+PrevAppVer)
    }
    else
    {
      Log.Warning("Current "+CurrAppVer+" is Lower than Previous "+PrevAppVer)
    }
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    CloseBrowser();
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    CloseFolder();
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  }
}


function ValidateMultiEnvironmentAppVersions()
{
 
  var arrVers = ProjectSuite.Variables.EnvironmentString.split(",")
  
  for(i=0;i<arrVers.length;i++)
  {
    ProjectSuite.Variables.EnvironmentString = arrVers[i]
    ValidateConstructPMAppVersion()
  }
}