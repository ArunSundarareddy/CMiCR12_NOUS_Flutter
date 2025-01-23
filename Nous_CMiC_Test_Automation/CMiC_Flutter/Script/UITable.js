//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
GetColumnCount //Function to return the column count for a standard web table
GetRowCount //Function to return the row count for a standard web table
GetColumnNames //Function to return the column names for a standard web table
GetColumnIndex //Function to return the column index of a given column name for a standard web table
GetRowIndex //Function to return the row index of a given row for a standard web table
GetCellObject //Function to return a particular cell object for a standard web table
VerifyCellValue //Function to verify the cell object's content
ClickCellItem // Function to Click the cell object of a standard web table
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetColumnCount
Parameters          : objTable - UI Table Element
Description         : Function to return the column count for a standard web table
Return Value        : Column Count
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetColumnCount(objTable)
{
  var intColCount = -1;
  
  if(aqObject.IsSupported(objTable,"ColumnCount"))
  {
    intColCount = objTable.ColumnCount(0);
  }
  return intColCount;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetRowCount
Parameters          : objTable - UI Table Element
Description         : Function to return the row count for a standard web table
Return Value        : Row Count
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetRowCount(objTable)
{
  var intRowCount = -1;
  
  if(aqObject.IsSupported(objTable,"RowCount"))
  {
    intRowCount = objTable.RowCount
  }
  return intRowCount;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetColumnNames
Parameters          : objTable - UI Table Element
Description         : Function to return the column names for a standard web table
Return Value        : Column names - string
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetColumnNames(objTable)
{
  var intColCount = GetColumnCount(objTable);
  var strColumnNames = null;
  
  if(intColCount>0)
  {
    strColumnNames = new Array(intColCount);
    var propsNames = ["ObjectType","tagName"]
    var propsValues = ["Cell","TH"]
    var tblHeaderCells = objTable.FindAllChildren(propsNames,propsValues,100)
    
    if ((tblHeaderCells.length>0) && (intColCount == tblHeaderCells.length))
    {
      for(var index = 0; index < tblHeaderCells.length; index++)
      {
        if(aqObject.IsSupported(tblHeaderCells[index],"contentText"))
        {
          //strColumnNames[index] = tblHeaderCells[index].contentText
          strColumnNames[index] = objTable.Cell(0,index).contentText
        }   
      }
    }
    return strColumnNames;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetColumnIndex
Parameters          : objTable - UI Table Element, strColName - column name, bolPartialCompare - true or false
Description         : Function to return the column index of a given column name for a standard web table
Return Value        : Column index - int
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetColumnIndex(objTable,strColName,bolPartialCompare)
{
  var colNames = GetColumnNames(objTable);
  var colIndex = -1;
  
  if (bolPartialCompare == null)
  {
    bolPartialCompare = false;
  }
  
  if(!(colNames == null))
  {
    for(var index = 0; index<colNames.length;index++)
    {
      var strColumnNameFromTable = aqString.ToLower(colNames[index]);
      var strColumnNameToCompare = aqString.ToLower(strColName);
      
      switch (bolPartialCompare)
      {
        case false:
          if( strColumnNameFromTable == strColumnNameToCompare)
          {
            colIndex = index;
            break;
          }
          break;
        case true:
          if( strColumnNameFromTable.includes(strColumnNameToCompare))
          {
            colIndex = index;
            break;
          }
          break;
      }
    }
  }
  return colIndex;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetRowIndex
Parameters          : objTable - UI Table Element, strColName - column name, bolPartialCompare - true or false
Description         : Function to return the row index of a given row for a standard web table
Return Value        : Row Index - int
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetRowIndex(objTable,strColName,strRowKeyIdentifierText)
{
  var colIndex = GetColumnIndex(objTable,strColName);
  var intRowCount = GetRowCount(objTable);
  var rowIndex = -1;
  
  if(colIndex > -1)
  {
    for(var index = 0 ; index < intRowCount ; index++)
    {
      var objCell = objTable.Cell(index,colIndex)
      var strCellValue = objCell.contentText
      if(strCellValue.includes(strRowKeyIdentifierText))
      {
        rowIndex = index;
        break;
      }
    }
  }
  return rowIndex;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetCellObject
Parameters          : objTable - UI Table Element, strColName - column name, strRowKeyIdentifierText - string
Description         : Function to return a particular cell object for a standard web table
Return Value        : cell - object
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetCellObject(objTable,strColName,strRowKeyIdentifierText)
{
  var colIndex = GetColumnIndex(objTable,strColName);
  var rowIndex = GetRowIndex(objTable,strColName,strRowKeyIdentifierText);
  var objCell = objTable.Cell(rowIndex,colIndex);
  
  if(objCell!=null && (objCell.ObjectType == "Cell"))
  {
    return objCell;
  }
  else
  {
    return null;
  }
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : VerifyCellValue
Parameters          : objCell - UI Cell Element, strPropNamesValues - property names, strTextToCompare - string
Description         : Function to verify the cell object's content
Return Value        : True or False
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function VerifyCellValue(objCell,strPropNamesValues,strTextToCompare)
{
  var bolMatched = false;
  var objCellChild =  GetChildUIObject(objCell,strPropNamesValues,100);
  
  if(aqObject.IsSupported(objCell,"contentText"))
  {
    var strCellValue = objCell.contentText
    if(strCellValue.includes(strTextToCompare))
    {
      bolMatched = true;
    }
  }
  return bolMatched;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : ClickCellItem
Parameters          : objCell - UI Cell Element, strPropNamesValues - property names
Description         : Function to Click the cell object of a standard web table
Return Value        : None
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function ClickCellItem(objCell,strPropNamesValues)
{
  var objCellChild =  GetChildUIObject(objCell,strPropNamesValues,100);
  var strObjectType = objCellChild.ObjectType;
  
  switch (strObjectType)
  {
    case "Checkbox":
      Check(objCellChild);
    break;
    default:
      Click(objCellChild);
  }
}
/*#######################################################################################################################################################*/



