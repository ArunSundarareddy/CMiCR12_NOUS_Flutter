//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
ReadConfigurationXl //Function to read the Configuration and Environment values from excel
ReadFlagValuesToDictionaries //Function to read the Flag values from Exce to Dictionary object
ReadXlInputDataValues //Function to read the excel input data
WriteDataInExcelCell //Function to write value to the excel
GetRowCountFromDownloadedExcel //Function to read the row count from downloaded excel
GetLatestDownloadedFile //Function to read the latest downloaded file name
GetCSVRecordCount //Function to read the record count of a CSV file
VerifyCSVColumnNameExists //Function to verify a particular Column name exists in the CSV file
VerifyCSVRowValuesExists //Function to verify a particular row value exists in the CSV file
OpenXLWorkbook //Function to open the excel workbook
OpenXLSheet //Function to open the excel sheet in an excel workbook
CloseXLWorkbook //Function to close the excel workbook
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : ReadConfigurationXl
Parameters          : -
Description         : Function to read the Configuration and Environment values from excel
Return Value        : true or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function ReadConfigurationXl()
{
  try
  {  
    //Kill excel process if running already
    KillTaskProcess("EXCEL");
      
    //Path to the Configuration Excel
    var objXlFilePath = ProjectSuite.Path+"TestData\\Configuration.xls"
    
    //Open the Excel file
    var XLapp = Excel.Open(objXlFilePath);
    
    //Read configuration sheet values
    var Worksheet = XLapp.SheetByTitle("Configuration");
    var colCount = Worksheet.ColumnCount
    var intRowCounter = 1; 
    var intColCounter = 1;
    var intColCntAppName, intColCntUser;
         
    while (intColCounter <= colCount)
    {
      if(Worksheet.Cell(intColCounter, 2).Value == "ChooseApp")
      {
        intColCntAppName= intColCounter
      }
      if(Worksheet.Cell(intColCounter, 2).Value == "ChooseUser")
      {
        intColCntUser= intColCounter
      }
      intColCounter = intColCounter + 1;
    }
    
    //Storing the AppName and User to the GLobal Project Variables
    Project.Variables.AppName = Worksheet.Cell(intColCntAppName, 3).Value
    Project.Variables.UserID = Worksheet.Cell(intColCntUser, 3).Value
    strAppName = Project.Variables.AppName
    
    //Read Environment sheet values
    var Worksheet = XLapp.SheetByTitle("Environment");
    var rowCount = Worksheet.RowCount
    var colCount = Worksheet.ColumnCount
    var intRowCounter = 1; 
    var intColCounter = 1;
    var intColCntURL,intColCntPath, intColCntAppName, intColCntEnvi, intColCntBrowser;
         
    while (intColCounter <= colCount)
    {
      if(Worksheet.Cell(intColCounter, 1).Value == "AppName")
      {
        intColCntAppName= intColCounter
      }
      if(Worksheet.Cell(intColCounter, 1).Value == "URL")
      {
        intColCntURL= intColCounter
      }
      if(Worksheet.Cell(intColCounter, 1).Value == "Path")
      {
        intColCntPath= intColCounter
      }
      if(Worksheet.Cell(intColCounter, 1).Value == "Environment")
      {
        intColCntEnvi= intColCounter
      }
       if(Worksheet.Cell(intColCounter, 1).Value == "Browser")
      {
        intColCntBrowser= intColCounter
      }      
      if(Worksheet.Cell(intColCounter, 1).Value == "TestRailURL")
      {
        intColCntTestRailURL = intColCounter
      }  
      intColCounter = intColCounter + 1;
    }
     
    //store the Environment values in Global project variables
    while (intRowCounter <= rowCount)
    {
      if(Worksheet.Cell(1, intRowCounter).Value == strAppName)
      {
        Project.Variables.URL = Worksheet.Cell(intColCntURL, intRowCounter).Value
        Project.Variables.ExcelPath = ProjectSuite.Path+"TestData\\"+Worksheet.Cell(intColCntPath, intRowCounter).Value
        strExcelPath = Project.Variables.ExcelPath
        Project.Variables.Path = strExcelPath
//        Log.Message("Test Data Path : "+Project.Variables.Path )
        Project.Variables.Envi = Worksheet.Cell(intColCntEnvi, intRowCounter).Value
        Project.Variables.strBrowserNameForTest = Worksheet.Cell(intColCntBrowser, intRowCounter).Value
        ProjectSuite.Variables.TestRailURL = Worksheet.Cell(intColCntTestRailURL, intRowCounter).Value
        break;
      }
      intRowCounter = intRowCounter + 1;
    }      
  }
 catch(err)
  {
    Log.Error("Exception: ReadConfigurationXl "+err.message);
  }
  finally
  {  
    //Kill if Excel Process is running
    KillTaskProcess("EXCEL");   
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : ReadFlagValuesToDictionaries
Parameters          : strTestName - Test Case Name required (as provided in the input data sheet, strXLFileName: Excel workbook name,
                      strSheetName - Excel sheet name
Description         : Function to read the Flag values from Exce to Dictionary object
Return Value        : Excel dictionary object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function ReadFlagValuesToDictionaries(strSheetName, strCustomerUserValue)
{
  try
  {    
    var intDictAdded = 2;
    var flgDict = false;
    let YsNTestFound = false;
    let objXlFilePath, objXlApp, intTotalColsMapping, strData;
    let objExlDict = Sys.OleObject("Scripting.Dictionary");
    
    //Delete the Items in the dictionary if there are any  
    if (objExlDict.Count > 0)
    {
      objExlDict.RemoveAll();
    }    

//    objXlFilePath = Project.Variables.Path;
    objXlFilePath = ProjectSuite.Path+"TestData\\Configuration.xls"
    
    objXlApp = DDT.ExcelDriver(objXlFilePath,strSheetName,true);
    
    //Fetch the total number of active columns
    intTotalColsMapping = DDT.CurrentDriver.ColumnCount;
    while (! DDT.CurrentDriver.EOF())
    {
      if(intDictAdded>=intTotalColsMapping)
      {
        YsNTestFound = true;
        break;
      }
      //condition to match required test case name to the test case name available in column 1
        for (intCol = 2; intCol<intTotalColsMapping; intCol++)
        {   
          strData = (objXlApp.Value(1));
          if (strData == strCustomerUserValue)
          {
            CurrColVal = intCol
            intCol = 2
            if(objXlApp.Value(intCol) != null)
            {
              if(flgDict == true)
              {
                intDictAdded = intDictAdded+1;
              }
              if(intDictAdded>=intTotalColsMapping)
              {
                break;
              }
              if(objXlApp.Value(intDictAdded) == null)
              {
                break;
              }
              strKey = objXlApp.Value(intDictAdded);
              objXlApp.next();
              strValue = objXlApp.Value(intDictAdded);
              objExlDict.Add (strKey, strValue);
              flgDict = true;
              objXlApp.First();
              break;
            }
            intCol = CurrColVal
            YsNTestFound = true;
          }
          else
          {
            objXlApp.next();
          }
        } 
    }
    if (!YsNTestFound)
      Log.Error("FAIL:: " + strCustomerUserValue + " not found in Input data file. Please check");
    else
      CloseXLWorkbook();
      KillTaskProcess("Excel");
      return objExlDict;
  }
  catch(err)
  {
    Log.Error("Exception: ReadFlagValuesToDictionaries "+err.message);
  }
}
/*#######################################################################################################################################################*/

/*#########################################################################################################################################################
Function Name       : ReadXlInputDataValues
Parameters          : strTestName - Test Case Name required (as provided in the input data sheet, strXLFileName: Excel workbook name,
                      strSheetName - Excel sheet name
Description         : Function to read the excel input data
Return Value        : Excel dictionary object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function ReadXlInputDataValues_OLD(strSheetName, strTestName)
{
  try
  {    
    var intDictAdded = 2;
    var flgDict = false;
    let YsNTestFound = false;
    let objXlFilePath, objXlApp, intTotalColsMapping, strData;
    let objExlDict = Sys.OleObject("Scripting.Dictionary");
    
    //Delete the Items in the dictionary if there are any  
    if (objExlDict.Count > 0)
    {
      objExlDict.RemoveAll();
    }    

    objXlFilePath = Project.Variables.Path;
    
    objXlApp = DDT.ExcelDriver(objXlFilePath,strSheetName,true);
    
    //Fetch the total number of active columns
    intTotalColsMapping = DDT.CurrentDriver.ColumnCount;
    while (! DDT.CurrentDriver.EOF())
    {
      if(intDictAdded>=intTotalColsMapping)
      {
        YsNTestFound = true;
        break;
      }
      //condition to match required test case name to the test case name available in column 1
        for (intCol = 2; intCol<intTotalColsMapping; intCol++)
        {   
          strData = (objXlApp.Value(1));
          if (strData == strTestName)
          {
            CurrColVal = intCol
            intCol = 2
            if(objXlApp.Value(intCol) != null)
            {
              if(flgDict == true)
              {
                intDictAdded = intDictAdded+1;
              }
              if(intDictAdded>=intTotalColsMapping)
              {
                break;
              }
              if(objXlApp.Value(intDictAdded) == null)
              {
                break;
              }
              strKey = objXlApp.Value(intDictAdded);
              objXlApp.next();
              strValue = objXlApp.Value(intDictAdded);
              objExlDict.Add (strKey, strValue);
              flgDict = true;
              objXlApp.First();
              break;
            }
            intCol = CurrColVal
            YsNTestFound = true;
          }
          else
          {
            objXlApp.next();
          }
        } 
    }
    if (!YsNTestFound)
      Log.Error("FAIL:: " + strTestName + " not found in Input data file. Please check");
    else
      CloseXLWorkbook();
      KillTaskProcess("Excel");
      return objExlDict;
  }
  catch(err)
  {
    Log.Error("Exception: ReadXlInputData: "+err.description);
  }
}
/*#######################################################################################################################################################*/

/*#########################################################################################################################################################
Function Name       : ReadXlInputDataValues
Parameters          : strTestName - Test Case Name required (as provided in the input data sheet, strXLFileName: Excel workbook name,
                      strSheetName - Excel sheet name
Description         : Function to read the excel input data
Return Value        : Excel dictionary object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function ReadXlInputDataValues(strSheetName, strTestName)
{
  try
  {    
    var intDictAdded = 3;
    var flgDict = false;
    let YsNTestFound = false;
    let objXlFilePath, objXlApp, intTotalColsMapping, strData;
    let objExlDict = Sys.OleObject("Scripting.Dictionary");
    
    //Delete the Items in the dictionary if there are any  
    if (objExlDict.Count > 0)
    {
      objExlDict.RemoveAll();
    }    

    //------------
    objXlFilePath = ProjectSuite.Path+"TestData\\R12.xls"
    Project.Variables.ExcelPath = objXlFilePath
    Project.Variables.Path = objXlFilePath
    
    if(ProjectSuite.Variables.EnvironmentString == "0")
    {
      //Open the Excel file
      var XLapp = Excel.Open(objXlFilePath);
    
      //Read Environment sheet values
      var Worksheet = XLapp.SheetByTitle("Environment");
      var colCount = Worksheet.ColumnCount
      var intRowCounter = 1; 
      var intColCounter = 1;
      var intColCntAppName, intColCntUser;
         
      while (intColCounter <= colCount)
      {
        if(Worksheet.Cell(intColCounter, 2).Value == "ParentEnvironment")
        {
          intColCntParentEnvironemnt = intColCounter
        }
        if(Worksheet.Cell(intColCounter, 2).Value == "SubEnvironment")
        {
          intColCntSubEnvironment = intColCounter
        }
        if(Worksheet.Cell(intColCounter, 2).Value == "Browser")
        {
          intColCntBrowser = intColCounter
        }
        if(Worksheet.Cell(intColCounter, 2).Value == "TestRailURL")
        {
          intColCntTestRailURL = intColCounter
        }
        intColCounter = intColCounter + 1;
      }
      
      ProjectSuite.Variables.ParentENV = Worksheet.Cell(intColCntParentEnvironemnt, 3).Value
      ProjectSuite.Variables.SubENV = Worksheet.Cell(intColCntSubEnvironment, 3).Value
      
      //Storing the AppName and User to the GLobal Project Variables
      Project.Variables.URL = "https://"+ProjectSuite.Variables.ParentENV+ProjectSuite.Variables.MidURL+ProjectSuite.Variables.SubENV
      
      if(ProjectSuite.Variables.Browser=="")
      {
        Project.Variables.strBrowserNameForTest = Worksheet.Cell(intColCntBrowser, 3).Value
      }
    }
    else
    {
      ProjectSuite.Variables.Environment = aqConvert.StrToInt(ProjectSuite.Variables.EnvironmentString)
      Project.Variables.URL = GetApplicationURL(ProjectSuite.Variables.Environment)
    
      if(!ProjectSuite.Variables.Browser=="")
      {
        Project.Variables.strBrowserNameForTest = ProjectSuite.Variables.Browser
      }
      else
      {
        Project.Variables.strBrowserNameForTest = ProjectSuite.Variables.strBrowser
      }
    }
    //------------
    
    objXlApp = DDT.ExcelDriver(objXlFilePath,strSheetName,true);
    
    //Fetch the total number of active columns
    intTotalColsMapping = DDT.CurrentDriver.ColumnCount;
    while (! DDT.CurrentDriver.EOF())
    {
      if(intDictAdded>=intTotalColsMapping)
      {
        YsNTestFound = true;
        break;
      }
      //condition to match required test case name to the test case name available in column 1
        for (intCol = 2; intCol<intTotalColsMapping; intCol++)
        {   
          strData = (objXlApp.Value(1));
          if (strData == strTestName)
          {
            CurrColVal = intCol
            intCol = 2
            if(objXlApp.Value(intCol) != null)
            {
              if(flgDict == true)
              {
                intDictAdded = intDictAdded+1;
              }
              if(intDictAdded>=intTotalColsMapping)
              {
                break;
              }
              if(objXlApp.Value(intDictAdded) == null)
              {
                break;
              }
              
              strKey = objXlApp.Value(intDictAdded);
              objXlApp.next();
              
              if(aqString.ToLower(objXlApp.Value(intDictAdded)) == "true") //Checking if the data is boolean and adding boolean value instead of string
              {
                blnFlagVal = true
                objExlDict.Add (strKey, blnFlagVal);
              }
              else if(aqString.ToLower(objXlApp.Value(intDictAdded)) == "false")
              {
                blnFlagVal = false
                objExlDict.Add (strKey, blnFlagVal);
              }
              else
              {
                strValue = objXlApp.Value(intDictAdded);
                objExlDict.Add (strKey, strValue);
              }
              
              flgDict = true;
              objXlApp.First();
              break;
            }
            intCol = CurrColVal
            YsNTestFound = true;
          }
          else
          {
            objXlApp.next();
          }
        } 
    }
    if (!YsNTestFound)
      Log.Error("FAIL:: " + strTestName + " not found in Input data file. Please check");
    else
      CloseXLWorkbook();
      KillTaskProcess("Excel");
     
    Project.Variables.URL = Project.Variables.URL+eval("ProjectSuite.Variables."+aqString.Replace(objExlDict.Item("CurrentProduct")," ",""))
      
      return objExlDict;
  }
  catch(err)
  {
    Log.Error("Exception: ReadXlInputData: "+err.message);
  }
}
/*#######################################################################################################################################################*/
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : WriteDataInExcelCell
Parameters          : Path, Sheetname, Column name, Row count, value to write
Description         : Function to write value to the excel
Return Value        : Excel dictionary object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function WriteDataInExcelCell(strPath,strSheet,strColumn,strRow,strValue)
{
  var excelFile = Excel.Open(strPath);
  var excelSheet = excelFile.SheetByTitle(strSheet);
  excelSheet.Cell(strColumn, strRow).Value = strValue;
  excelFile.Save();
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetRowCountFromDownloadedExcel
Parameters          : Path, Sheetname
Description         : Function to read the row count from downloaded excel
Return Value        : Excel dictionary object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetRowCountFromDownloadedExcel(strExcelPath,strSheetName)
{
  var excelFile = Excel.Open(strExcelPath);
  var excelSheet = excelFile.SheetByTitle(strSheetName);
  var intRowCount = excelSheet.RowCount
  return intRowCount
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetLatestDownloadedFile
Parameters          : Path
Description         : Function to read the latest downloaded file name
Return Value        : Excel dictionary object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetLatestDownloadedFile(strPath)
{

  let latestFile = "";

  try 
  {
    var folder = aqFileSystem.GetFolderInfo(strPath);
    var files = folder.Files;
    latestFile = 1
 
    if(files != null)
    {
      for (let i = 0; i <= files.Count-1; i++)
      {
        var file = files.Item(i);
        if (aqConvert.StrToDateTime(aqConvert.VarToStr(files.Item(i).DateLastModified)) >= aqConvert.StrToDateTime(aqConvert.VarToStr(files.Item(latestFile).DateLastModified))) 
        {
          if(files.Item(i).Name != "desktop.ini")
          {
            latestFile = i;
          }
        }
      }
      if (latestFile !== "") 
      {
        Log.Message("Latest downloaded file: " + files.Item(latestFile).Name);
        return files.Item(latestFile).Name;
      } 
    }
    else 
    {
        Log.Warning("No downloaded files found in the specified folder.");
    }

  } 
  catch (e) 
  {
      Log.Error("Error occurred: " + e.description);
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetCSVRecordCount
Parameters          : Path
Description         : Function to read the record count of a CSV file
Return Value        : Excel dictionary object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetCSVRecordCount(strPath)
{
  // Creates a driver
  DDT.CSVDriver(strPath);
  RecordCount = 0
  // Iterates through records
  while (! DDT.CurrentDriver.EOF())
    {
    RecordCount = RecordCount+1
    DDT.CurrentDriver.Next();
    }
    
   
  // Closes the driver
  DDT.CloseDriver(DDT.CurrentDriver.Name);
  return RecordCount;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VerifyCSVColumnNameExists
Parameters          : Path
Description         : Function to verify a particular Column name exists in the CSV file
Return Value        : Excel dictionary object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyCSVColumnNameExists(strPath,strColumnName)
{
  // Creates a driver
  blnFound = false;
  DDT.CSVDriver(strPath);
  RecordCount = 0
  // Iterates through records
  while (! DDT.CurrentDriver.EOF())
    {
      intColCount = DDT.CurrentDriver.ColumnCount
      for(ij=0;ij<intColCount-1;ij++)
      {
        if(DDT.CurrentDriver.ColumnName(ij) == strColumnName)
        {
          blnFound = true;
          break;
        }
      }
      if(blnFound == true)
      {
        break;
      }
    DDT.CurrentDriver.Next();
    }

  // Closes the driver
  DDT.CloseDriver(DDT.CurrentDriver.Name);
  return blnFound;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VerifyCSVRowValuesExists
Parameters          : Path
Description         : Function to verify a particular row value exists in the CSV file
Return Value        : Excel dictionary object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyCSVRowValuesExists(strPath,strColumnName,strRowValues)
{
  // Creates a driver
  blnFlag = false;
  DDT.CSVDriver(strPath);
  i = 0
  arrRowValues = strRowValues.split(";")
  // Iterates through records
  while (! DDT.CurrentDriver.EOF())
  {
    if(DDT.CurrentDriver.Value(strColumnName) ==  arrRowValues[i])
    {
      blnFlag = true
      i=i+1
    }
    else
    {
      blnFlag = false
      break  
    }
    DDT.CurrentDriver.Next(); 
  }

  // Closes the driver
  DDT.CloseDriver(DDT.CurrentDriver.Name);
  return blnFlag;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : OpenXLWorkbook
Parameters          : strXLPath - Folder path where the excel file is stored, strXLFileName - Excel file name
Description         : Function to open the excel workbook
Return Value        : Excel workbook object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function OpenXLWorkbook(strXLPath)
{
  try
  {
    var objXL,strExcelPath;
    let strXLFileName = Project.Variables.prjTestDataFileName;
    strExcelPath = strXLPath + strXLFileName + ".xls";
    objXL = DDT.ExcelDriver(strExcelPath,"InputData",true);
  }
  catch(err)
  {
    Log.Error("Exception: OpenXLWorkbook: "+err.description);
  }
  finally
  {
    return objXL;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : OpenXLSheet
Parameters          : strXLPath - Folder path where the excel file is stored, strXLFileName - Excel workbook name, strSheetName - Excel sheet name
Description         : Function to open the excel sheet in an excel workbook
Return Value        : Excel sheet object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function OpenXLSheet(strXLPath, strSheetName)
{
  try
  {
    var objXL,strExcelPath;
    let strXLFileName = Project.Variables.prjTestDataFileName;
    strExcelPath = strXLPath + "\\" + strXLFileName + ".xls";
    objXL = DDT.ExcelDriver(strExcelPath,strSheetName,true);
  }
  catch(err)
  {
    Log.Error("Exception: OpenXLSheet: "+err.description);
  }
  finally
  {
    return objXL;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : CloseXLWorkbook
Parameters          : None
Description         : Function to close the excel workbook
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function CloseXLWorkbook()
{
  try
  {
    DDT.CloseDriver(DDT.CurrentDriver.Name);
  } 
  catch(err)
  {
    Log.Error("Exception: CloseXLWorkbook: "+err.description);
  }  
}
/*#######################################################################################################################################################*/

/*#########################################################################################################################################################
Function Name       : WriteDataInExcelCell
Parameters          : Path, Sheetname, Column name, Row count, value to write
Description         : Function to write value to the excel
Return Value        : Excel dictionary object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function ReadDataInExcelCell(strPath,strSheet,strColumn,strRow)
{
  var excelFile = Excel.Open(strPath);
  var excelSheet = excelFile.SheetByTitle(strSheet);
  return excelSheet.Cell(strColumn, strRow).Value
}
/*#######################################################################################################################################################*/
