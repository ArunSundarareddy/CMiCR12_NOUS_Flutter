//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
EventControl1_OnStartTest //Function to execute at the start of a Test
EventControl1_OnStopTest //Function to execute at the End of a Test

/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : EventControl1_OnStartTest
Parameters          : -
Description         : Function to execute at the start of a Test
Return Value        : Date Time
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
Updated By          : 
#########################################################################################################################################################*/
function EventControl1_OnStartTest(Sender)
{
  Log.LockEvents(0)  
  //Reading the Configuration Excel
  Project.Variables.strNewPageUrl = ""
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : EventControl1_OnStartTest
Parameters          : -
Description         : Function to execute at the End of a Test
Return Value        : Date Time
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
Updated By          : 
#########################################################################################################################################################*/
function EventControl1_OnStopTest(Sender)
{
  Log.UnlockEvents() 
  KillTaskProcess("Excel");
  Project.Variables.strNewPageUrl = ""
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CMiC_TESTRAIL_OnStopTestCase
Parameters          : -
Description         : Function to execute at the End of a Test
Return Value        : Date Time
Author              : Dhruv
Creation Date       : 26-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
Updated By          : 
#########################################################################################################################################################*/
function CMiC_TESTRAIL_OnStopTestCase(Sender, StopTestCaseParams)
{
//------------------------------------------------------------------------------------------------------------------------------------------------------
//  CreateStepFolder("TestRail - Posting result");
//------------------------------------------------------------------------------------------------------------------------------------------------------ 
  try{
      var RunID = ProjectSuite.Variables.RunID;
      var TestCaseID = ProjectSuite.Variables.TestCaseID;
      var RecordIdx;
      var address = "https://cmic.testrail.io/index.php?/api/v2/add_result_for_case/" + RunID  + "/" +TestCaseID;
      Log.Message("TestRail CaseID : "+TestCaseID);
      Log.Message("TestRail Result Address : "+address);
      var userName = ProjectSuite.Variables.userName;
      var userPassword = ProjectSuite.Variables.userPassword.DecryptedValue; 
      
      Log.Message("userName - "+userName)
          
      // Convert the user credentials to base64 for preemptive authentication
      var credentials = aqConvert.VarToStr(dotNET.System.Convert.ToBase64String
        (dotNET.System_Text.Encoding.UTF8.GetBytes_2(userName + ":" + userPassword)));

  
      var request = aqHttp.CreatePostRequest(address);
      request.SetHeader("Authorization", "Basic " + credentials);
      request.SetHeader("Content-Type", "application/json");

      var statusId;
      var comment = "";
      switch (StopTestCaseParams.Status)
      {
        case 0: // lsOk
          statusId = 1;
          comment = "Passed through TestComplete"; // Passed
          break;
        case 1: // lsWarning
          statusId = 4; // Passed with a warning
          comment = StopTestCaseParams.FirstWarningMessage;
          break;
        case 2: // lsError
          statusId = 5; // Failed
          comment = StopTestCaseParams.FirstErrorMessage;
          break;
      }

      var requestBody =
      {
        "status_id": statusId,
        "comment": comment
      };

      var response = request.Send(JSON.stringify(requestBody));
  
      if (response.StatusCode != aqHttpStatusCode.OK)
      {
        Log.Message("Failed to send results to TestRail. See the Details in the previous message.");
      } 
  }
  catch (error){
    Log.Message("Error Occured in Test Rail result posting event - "+error)
  }
//  //========Logout procedure
//  try
//  {  
//  Browsers.Item(btChrome).Navigate(ProjectSuite.Variables.TestRailURL + "/logout.jsp");
//  Log.Message(ProjectSuite.Variables.TestRailURL + "/logout.jsp")
//  Delay(2000);
//  }
//  catch (E)
//  {
//   Log.Warning("Error during Logout procedure"); 
//  }
//
////------------------------------------------------------------------------------------------------------------------------------------------------------
//  CloseFolder();
////------------------------------------------------------------------------------------------------------------------------------------------------------
}

