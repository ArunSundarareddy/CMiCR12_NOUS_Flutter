//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
GetDateTimeStamp //Function to get date time stamp
GetBackDate //Function to get a back date
GetFutureDate //Function to get a future date
GetDateInNumberWithZero //Function to add zero as prefix if date is single number
GetMonthInNumberWithZero //Function to add zero as prefix if month is single number
GetMonthInMMM //Function to return date value with MMM month code
GetMonthFullName //Function to return full month name
DateFormatChange //Function to change the date format
GenerateDateTimeString //Function to generate the date and time as string with required format
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetDateTimeStamp
Parameters          : strFormat - string - mm/dd/yyyy - mm/dd/yy
Description         : Function to get date time stamp
Return Value        : Date Time
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
Updated By          : 
#########################################################################################################################################################*/
function GetDateTimeStamp(strFormat)
{
   
  var dte = new Date(); 
  var dteDate = dte.getDate();  
  var dteYear = dte.getFullYear();
  var dteMonth = dte.getMonth();
  var dteHour = dte.getHours();
  var dteMinutes = dte.getMinutes(); 
  var dteSeconds = dte.getSeconds(); 
  var dteTime = dteHour+""+dteMinutes+""+dteSeconds;
  var dteTimeFull = dteHour+"."+dteMinutes+"."+dteSeconds;
  var strFullDate = "";
  
  switch(strFormat)
  {
    case "DDMMYYYY":      
      strFullDate =  GetDateInNumberWithZero(dteDate) +""+GetDateInNumberWithZero(dteMonth)+""+dteYear;     
      break;
    case "MMDDYYY":      
      strFullDate = "D"+GetMonthInMMM(dteMonth)+GetDateInDDIfSingleNumber(dteDate)+ dteYear+"T"+ dteTime;      
      break;  
    case "MM/DD/YYYY":      
      strFullDate = GetMonthInNumberWithOutZero(dteMonth)+"/"+ dteDate +"/"+ dteYear;     
      break; 
    case "0M/0D/YYYY":
      strFullDate = GetMonthInNumberWithZero(dteMonth)+"/"+ GetDateInNumberWithZero(dteDate) +"/"+ dteYear;     
      break;
    case "MM.DD.YYYY":      
      strFullDate = GetMonthInNumberWithOutZero(dteMonth)+"."+ dteDate +"."+ dteYear;     
      break; 
    case "MDYT":      
      strFullDate = "D-"+GetMonthInNumberWithOutZero(dteMonth)+"."+ dteDate +"."+ dteYear+"_T-"+ dteTimeFull;      
      break; 
    case "yyyy-mm-dd":
    case "YYYY-MM-DD":
      var month = ('0' + (dteMonth + 1)).slice(-2); 
      var day = ('0' + dteDate).slice(-2); 
      strFullDate = dteYear + '-' + month + '-' + day;
      break; 
    case "STRDDMMYYYY":
      strFullDate =GetDayInNumberWithZero(dteDate) +  GetMonthInNumberWithZero(dteMonth) + aqConvert.IntToStr(dteYear)
      break;
	case "DDMMYYYY":      
      strFullDate =  GetDateInNumberWithZero(dteDate) +""+GetMonthInNumberWithZero(dteMonth)+""+dteYear;     
      break; 			  
    default:
      strFullDate = "D"+GetMonthInMMM(dteMonth)+GetDateInDDIfSingleNumber(dteDate)+dteYear+"T"+dteTime;      
  }
  return strFullDate;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetBackDate
Parameters          : intBackYears - Number of years to be back dated, intDeltaMonths - Months for decrement from present month,
                      intDeltaDate - Days for decrement from present date, strDateFormat - Date format for example "MM/DD/YYYY"
Description         : Function to get a back date
Return Value        : Date Time
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetBackDate(intBackYears,intDeltaMonths,intDeltaDate,strDateFormat)
{
  var strDate = '';
  var dteObject = new Date();
  dteObject.setFullYear(dteObject.getFullYear()-intBackYears);
  
  if(!(intDeltaMonths==null))
  {
    dteObject.setMonth(dteObject.getMonth()-intDeltaMonths);
  }
  if(!(intDeltaDate==null))
  {
    dteObject.setDate(dteObject.getDate()-intDeltaDate);
  }  
  switch(strDateFormat)
  {
	case "DDMMYYYY":
      strDate = GetDateInNumberWithZero(dteObject.getDate())+""+GetMonthInNumberWithZero(dteObject.getMonth())+""+dteObject.getFullYear();
      break; 
    case "MM/DD/YYYY":
      strDate = GetMonthInNumberWithZero(dteObject.getMonth())+"/"+GetDateInNumberWithZero(dteObject.getDate())+"/"+dteObject.getFullYear();
      break;
    case "MMM/DD/YYYY":
      strDate = GetMonthInMMM(dteObject.getMonth())+"/"+GetDateInNumberWithZero(dteObject.getDate())+"/"+dteObject.getFullYear();
      break;
    default:
      strDate = GetMonthInNumberWithZero(dteObject.getMonth())+"/"+GetDateInNumberWithZero(dteObject.getDate())+"/"+dteObject.getFullYear();
  }
  return strDate;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetFutureDate
Parameters          : intFutureYears - Number of years to be forworded dated, intDeltaMonths - Months for incremented from present month,
                      intDeltaDate - Days for incremented from present date, strDateFormat - Date format for example "MM/DD/YYYY"
Description         : Function to get a future date
Return Value        : Date Time
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetFutureDate(intFutureYears,intDeltaMonths,intDeltaDate,strDateFormat)
{
  var strDate = '';
  var dteObject = new Date();  
  dteObject.setFullYear(dteObject.getFullYear()+intFutureYears);
  
  if(!(intDeltaMonths==null))
  {
    dteObject.setMonth(dteObject.getMonth()+intDeltaMonths);
  }
  if(!(intDeltaDate==null))
  {
    dteObject.setDate(dteObject.getDate()+intDeltaDate);
  }  
  switch(strDateFormat)
  {
    case "DDMMYYYY":
      strDate = GetDateInNumberWithZero(dteObject.getDate())+""+GetMonthInNumberWithZero(dteObject.getMonth())+""+dteObject.getFullYear();
      break;
    case "MM/DD/YYYY":
      strDate = GetMonthInNumberWithZero(dteObject.getMonth())+"/"+GetDateInNumberWithZero(dteObject.getDate())+"/"+dteObject.getFullYear();
      break;
    case "MMM/DD/YYYY":
      strDate = GetMonthInMMM(dteObject.getMonth())+"/"+GetDateInNumberWithZero(dteObject.getDate())+"/"+dteObject.getFullYear();
      break;
    case "M/D/YYYY":
      strDate = GetMonthInNumberWithOutZero(dteObject.getMonth())+"/"+dteObject.getDate()+"/"+dteObject.getFullYear();
      break;
    case "MMM-YYYY":
      strDate = GetMonthInMMM(dteObject.getMonth())+"-"+dteObject.getFullYear();
      break;
    case "DDMMYYYY":
      strDate = GetDateInNumberWithZero(dteObject.getDate())+""+GetMonthInNumberWithZero(dteObject.getMonth())+""+dteObject.getFullYear();
      break;
    default:
      strDate = GetMonthInNumberWithZero(dteObject.getMonth())+"/"+GetDateInNumberWithZero(dteObject.getDate())+"/"+dteObject.getFullYear();
  }
  return strDate;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetDateInNumberWithZero
Parameters          : intDateCode - If date is single number a zero will be prefixed
Description         : Function to add zero as prefix if date is single number
Return Value        : Date Time
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetDateInNumberWithZero(intDateCode)
{
  var dates = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
  var strMonthNumber = '';

  if(intDateCode<10)
  {
    strMonthNumber = dates[intDateCode-1];
  }
  else
  {
    strMonthNumber = aqConvert.VarToStr(intDateCode);
  }
  return strMonthNumber;
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetMonthInNumberWithZero
Parameters          : intMonthCode - If month is single number a zero will be prefixed
Description         : Function to add zero as prefix if month is single number
Return Value        : Date Time
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetMonthInNumberWithZero(intMonthCode)
{
  var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  return months[intMonthCode];
}
/*#######################################################################################################################################################*/

/*#########################################################################################################################################################
Function Name       : GetDateInNumberWithZero
Parameters          : intMonthCode - If month is single number a zero will be prefixed
Description         : Function to add zero as prefix if Day is single number
Return Value        : Date Time
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetDayInNumberWithZero(intDayCode)
{
  var day = ["00","01", "02", "03", "04", "05", "06", "07", "08", "09"];
  return day[intDayCode];
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GetMonthInMMM
Parameters          : intMonthCode - month code
Description         : Function to return date value with preferred month code
Return Value        : Month
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetMonthInMMM(intMonthCode)
{
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[intMonthCode];
}
/*#######################################################################################################################################################*/
/*#########################################################################################################################################################
Function Name       : GetDateInDDIfSingleNumber
Parameters          : dteDate - string - mm/dd/yyyy - mm/dd/yy
Description         : Function to add zero as prefix if date is single number
Return Value        : Date Time
Author              : Arun S. Reddiar
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetDateInDDIfSingleNumber(dteDate)
{
   var strDate = aqConvert.VarToStr(dteDate);
   if(strDate.length<2)
   {
      return "0"+strDate;
   }
   else
   {
      return strDate;
   }
}
/*#######################################################################################################################################################*/

/*#########################################################################################################################################################
Function Name       : GetMonthFullName
Parameters          : intMonthCode - month code
Description         : Function to return full month name
Return Value        : Month name
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GetMonthFullName(intMonthCode)
{
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[intMonthCode];
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : DateFormatChange
Parameters          : inputDate - Date to be formatted, strDate - Location of date starting from 0(Eg: Tue Jun 26 00:55:23 CDT 2018	Normal: strDate is 2),
                      strMonth - Location of Month starting from 0(Eg: Tue Jun 26 00:55:23 CDT 2018	Normal: strMonth is 1),
                      strYear - Location of Year starting from 0(Eg: Tue Jun 26 00:55:23 CDT 2018	Normal: strYear is 5),
                      strTime - Location of Time starting from 0(Eg: Tue Jun 26 00:55:23 CDT 2018	Normal: strTime is 3),
                      strformat - Required format
Description         : Function to change the date format
Return Value        : Date
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function DateFormatChange(inputDate,strDate,strMonth,strYear,strTime,strformat)
{
  try
  {
    if(strDate != "" && strMonth!= "" && strYear!= "" || strTime!= "")
    {
      var dateSplit = inputDate.split(" ");
      var reqDate = dateSplit[strDate]+" "+dateSplit[strMonth]+" "+dateSplit[strYear]+" "+dateSplit[strTime];
    }
    else
      reqDate = inputDate;
    var finalDate = aqConvert.DateTimeToFormatStr(reqDate, strformat);
  }
  catch(err)
  {
    Log.Error("FAIL: "+err.description);
  }
  finally
  {
    return finalDate;
  } 
}
/*#######################################################################################################################################################*/


/*#########################################################################################################################################################
Function Name       : GenerateDateTimeString
Parameters          : None
Description         : Function to generate the date and time as string with required format
Return Value        : Formatted date
Author              : Arun
Creation Date       : 2-Feb-2024
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GenerateDateTimeString()
{ 
  try
  {  
   var strDateTime = aqDateTime.GetDayOfYear(aqDateTime.Time()) + "_" + aqDateTime.GetHours(aqDateTime.Time()) + "_" + aqDateTime.GetMinutes(aqDateTime.Time());
  }
  catch(err)
  {
    Log.Error("Exception: SelectAccountsSearchResult " + err.message);
  }  
  finally{
    return strDateTime;
  }
}
/*#######################################################################################################################################################*/



