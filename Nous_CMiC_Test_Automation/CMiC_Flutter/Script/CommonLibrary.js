//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
Function Name       : CMiC_LaunchURL()
Parameters          : None
Description         : Function to launch the CMiC URL
Return Value        : True or False 
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    : 
Revision Date       :
#########################################################################################################################################################*/
function CMiC_LoginDirectURL()
{
  CreateStepFolder("Launch the Direct URL and Login to Environment");
//--Variables----------------------------------------------------------------------------------------------------------------------------------------------
  var blnResult = false;
  var strURL = Project.Variables.URL
  var strUserID = Project.Variables.UserID
  var strPassword = Project.Variables.Password
//--------------------------------------------------------------------------------------------------------------------------------------------------     
  LaunchURL(strURL,"Launch CMiC Application with URL:");  //Action Performed     
//------------------------------------------------------------------------------------------------------------------------------------------------
  if(!NotExists_WOLog(CMiC_txtUsername))
  {      
    if(!NotExists_WOLog(CMiC_txtClientid))
    {
      var env =  aqConvert.StrToInt(ProjectSuite.Variables.EnvironmentString)
      var strClientID =  ProjectSuite.Variables.AllEnvironments.Item(9,env)
      strUserID =  ProjectSuite.Variables.AllEnvironments.Item(4,env)
      strPassword =  ProjectSuite.Variables.AllEnvironments.Item(5,env)
      Enter(CMiC_txtClientid,strClientID,"Enter Client ID : ["+CMiC_txtClientid+"]");
    }
    Enter(CMiC_txtUsername,strUserID,"Enter User ID : ["+strUserID+"]");
    Enter(CMiC_txtPassword,strPassword,"Enter Password : ["+strPassword+"]");
    Click(CMiC_btnSigIn,"Click Sign In button");
  }
//---------------------------------------------------------------------------------------------------------------------------------------------------------
  CloseFolder();
//--Return Value-------------------------------------------------------------------------------------------------------------------------------------------
  return blnResult;
}
/*#######################################################################################################################################################*/
