//USEUNIT Reference_Libraries

/*#########################################################################################################################################################
------------------------------------------------------List of Functions-------------------------------------------------------------------------------
###########################################################################################################################################################*/
GenerateRandom
AddNewItemToArray
PrintArray
/*#######################################################################################################################################################*/


function Test(){
  Log.Message(GenerateRandom(5,"Ne"));
  Log.Message("First Number "+ GenerateSSN(1));
  Log.Message("Second Number "+ GenerateSSN(2));
  Log.Message("Third Number "+ GenerateSSN(3));
}

/*#########################################################################################################################################################
Function Name       : GenerateRandom
Parameters          : intCharOrNumberLimit - Sets limit for Alphabets,Number of mix of both, strRandomType - Options Aplhabets(Text),Number or both. 
Description         : Function used to generate random values
Return Value        : random value
Author              : Arun S. Reddiar
Creation Date       : 28-Apr-2021
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function GenerateRandom(intCharOrNumberLimit,strRandomType)
{
     var result = '';
     var characters ='';
     
     switch(strRandomType)
     {
       case "N":
        characters = '0123456789';
        break;
       case "T":
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        break;
       case "NT":
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        break;
       default:
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        break;
     }
     
     var charactersLength = characters.length;
     for ( var i = 0; i < intCharOrNumberLimit; i++ )
     {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }     
     return result;
}
/*#######################################################################################################################################################*/

/*#########################################################################################################################################################
Function Name       : AddNewItemToArray
Parameters          : objArray - array, strItemValue - string
Description         : Function used to add new item to an array
Return Value        : Nonerandom value
Author              : Arun S. Reddiar
Creation Date       : 28-Apr-2021
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function AddNewItemToArray(objArray,strItemValue)
{
  var arrTemp = objArray.push(strItemValue);
}
/*#######################################################################################################################################################*/

/*#########################################################################################################################################################
Function Name       : PrintArray
Parameters          : strArray - array
Description         : Function used to print an array
Return Value        : None
Author              : Arun S. Reddiar
Creation Date       : 28-Apr-2021
Special Conditions  :
Revision History    :
Revision Date       :
#########################################################################################################################################################*/
function PrintArray(strArray)
{
  var strTitle =""; 
  for ( var i = 0; i < strArray.length; i++ )
  {
    strTitle = ""+strTitle + i +" - "+ strArray[i] +" | "
  }   
  Log.Message("Item "+strTitle)
}
/*#######################################################################################################################################################*/

