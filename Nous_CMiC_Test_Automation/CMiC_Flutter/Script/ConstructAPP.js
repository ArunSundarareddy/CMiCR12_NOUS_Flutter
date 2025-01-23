//USEUNIT Reference_Libraries

/**
Desc : This method is used to enter a unique ID, select EEO, enter Default Job Title, Job Summary, Responsibilities,
   select Salary Grade, Physical Demands, Work Environment, and FLSA Type and saved In the position creation popup
*/
function CreatePositions(){
  try{
   
    CreateStepFolder("Click on Create Position on the main position page") 
    //-------------------------------------------------------------------------
    Click(Position_NameTxbox) 
    EnterKey(Position_NameTxbox,"Senior Developer")
    Sys.Keys("[Esc]") 
    WaitObjLoad(Postion_SalaryGradeTxBox)
    //--------------------------------------------------------------------------------------
    Click(Postion_SalaryGradeTxBox) 
    delay3k()
    Sys.Keys("[Down][Enter]")
    WaitObjLoad(Position_EEOtxbox)
    //-------------------------------------------------------------------------------------- 
    Click(Position_EEOtxbox) 
    delay3k()
    Sys.Keys("[Down][Enter]") 
    WaitObjLoad(Position_TrainingType)
    //--------------------------------------------------------------------------------------
    Click(Position_TrainingType)  
    delay3k()
    Sys.Keys("[Down][Enter]")
    WaitObjLoad(Position_JobSummary)
    //--------------------------------------------------------------------------------------
    Click(Position_JobSummary) 
    EnterKey(Position_JobSummary,"Testing automation ","Enter the Job Summary text area")
    //--------------------------------------------------------------------------------------
    Click(Position_ResponsibilityTxBox) 
    EnterKey(Position_ResponsibilityTxBox,"Testing automation a","Enter Responsibility text area")
    //--------------------------------------------------------------------------------------
    Click(Position_ShortDescription)
    EnterKey(Position_ShortDescription,"Testing","Enter Responsibility text area")
    WaitUntilToLoad()
    //--------------------------------------------------------------------------------------
    Click(Position_SaveBtn)
    Delay(2000)
    WaitUntilToLoad()
    //--------------------------------------------------------------------------------------
    strCode =  OCR.Recognize(objPage).BlockByText("Positions ").Text
    var blResult= false
    //--------------------------------------------------------------------------------------
    blResult = (strCode==undefined || strCode=='' || strCode==null) ? false: true
    writeLogline("Position created succesfully "+strCode,"Compare","",blResult)
  }catch(e){
    writeLogline("Failed in CreatePositions function ","Exception","",false)
  }
}
 
