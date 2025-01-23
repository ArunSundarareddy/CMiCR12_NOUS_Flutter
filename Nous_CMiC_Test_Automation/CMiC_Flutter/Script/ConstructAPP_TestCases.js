//USEUNIT Reference_Libraries

/*###############################################################################################################################################################
  C118781 CT APP Open Position Creation Popup
###############################################################################################################################################################*/
function C118781()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  let dictTestData = ReadXlInputDataValues("ConstructAPP", "C118781")
//
//  ProjectSuite.Variables.TestCaseID = dictTestData.Item("TestRailTCID")
//  Log.Message("TestCaseID: "+ProjectSuite.Variables.TestCaseID) 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("CT APP Open Position Creation Popup");
//----Pre-Requisite: Handling via direct URL---------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Pre-requisite: Login to Construct APP") 
  CMiC_LoginDirectURL()
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  EnableFlutterAccessibility_CT()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Click on Create Position on the main position page") 
  Click(CAPP_btnPositions,"Click Positions")
  WaitObjLoad(CAPP_btnAddNewPosition)
  Click(CAPP_btnAddNewPosition,"Click Create New Position")
  WaitObjLoad(CAPP_lblCreatePosition)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Verify that Create Position Pop-Up is displayed") 
  Exists(CAPP_lblCreatePosition,"Create Position Pop-Up is displayed")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseBrowser(); 
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}
/*#############################################################################################################################################################*/
//C118782 CT APP: Enter Position Details
function C118782()
{
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  let dictTestData = ReadXlInputDataValues("ConstructAPP", "C118782")
  ProjectSuite.Variables.TestCaseID = dictTestData.Item("TestRailTCID")
  Log.Message("TestCaseID: "+ProjectSuite.Variables.TestCaseID)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("CT APP: Enter Position Details");
//----Pre-Requisite: Handling via direct URL---------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("Pre-requisite: Login to Construct APP") 
  CMiC_LoginDirectURL()
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  EnableFlutterAccessibility_CT()
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("1 Click on Create Position on the main position page") 
  Click(CAPP_btnPositions,"Click Positions")
  WaitObjLoad(CAPP_btnAddNewPosition)
  Click(CAPP_btnAddNewPosition,"Click Create New Position")
  WaitObjLoad(CAPP_lblCreatePosition)
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("2 Verify that Create Position Pop-Up is displayed") 
  Exists(CAPP_lblCreatePosition,"Create Position Pop-Up is displayed")
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CreateStepFolder("3 Position details should be saved, and the position should be created successfully") 
  CreatePositions()
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseBrowser(); 
  CloseFolder();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
}