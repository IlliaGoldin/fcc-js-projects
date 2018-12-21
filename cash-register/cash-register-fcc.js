//make life easier
let log = console.log;

//calcDrawerTotal calculates the total between array elements assuming the array is properly structured and uses correct data types
//returns a number
//argument passed to calcDrawerTotal must be a two-dimensional array with arr[index][1] always being a positive integer for this function to operate correctly
//it might be a good idea to validate an argument passed to calcDrawerTotal before the function performs any meaningful calculations, but is not necessary within the scope of this challenge
let calcDrawerTotal = function (arr) {
  let calculatedTotal = arr.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue[1];
  },0);
  //fix decimal point
  let fixedTotal = Number(calculatedTotal.toFixed(2));
  return fixedTotal;
};

//cash register drawer function 
//accepts price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument
function checkCashRegister(price, cash, cid) {
  
  let cashInDrawerTotal = calcDrawerTotal(cid);
  let changeDue = cash - price;

  //if there is not enough cash in drawer to issue change return appropriate status and empty array
  if (cashInDrawerTotal < changeDue) {
    return  {status: "INSUFFICIENT_FUNDS", change: []};
  }
  //if cash in drawer equals to change due return appropriate status and array that equals cash in drawer 
  if (cashInDrawerTotal == changeDue) {
    return {
      status : "CLOSED",
      change : cid
    };
  }

  //define bill values
  let billValues = {
    "ONE HUNDRED" : 100,
    "TWENTY"      : 20,
    "TEN"         : 10,
    "FIVE"        : 5,
    "ONE"         : 1,
    "QUARTER"     : 0.25,
    "DIME"        : 0.1,
    "NICKEL"      : 0.05,
    "PENNY"       : 0.01 
  }

  //changeBIlls is an array representing a set aside spot for bills we will use to issue change
  let changeBills = [];

  //reverse array to start the loop iteration from largest to smallest bills
  cid.reverse();
  
  //iterate through cid and create an array (changeBills) containing bills and amounts required to issue change
  //changeBills will have the same structure as cid and will start from highest bill values to lowest, i.e. "ONE HUNDRED" -> "TWENTY" -> "TEN" -> etc.
  for (let i = 0; i < cid.length; i++) {
    //br is a checkmark that represents completion of the first if statement
    //when first if statement in this loop gets initiated br variable will be increased by 1
    //br = 1 -> indicates first if statement in the loop has been initiated and completed
    //the following (second) if statement in this loop depends on br 
    //second if statement in this loop will refer to br variable to check whether the first if statement has been initiated
    //second if statement will be initiated only if the first one hasnt been
    let br = 0;
    //each array element (cid[i]) we iterate through is another array containing 2 elements:
    //- cid[i][0] = str that represents a name of the bill we are working with, such as "ONE HUNDRED"
    //- cid[i][1] = number that represents how much money is available in that bill, such as 100
    //for example if the element we are working with looks like this -> ["ONE HUNDRED", 100] assign 100 to a variable called moneyInCurrentBills
    let moneyInCurrentBills = cid[i][1];
    //the first if statement will check if change due amount is larger then the amount of money we have in bills we are working with (e.g. changeDue = 90, bill we are working with is "TWENTY", amount of money available in twenty's is 60)
    //if it is we will use all money available in the current element to issue change by pushing the element to changeBills array, i.e. set money aside or deplete money resources in current element
    if (changeDue > moneyInCurrentBills) {
      //decrease change due by the amount of money available in current bills, i.e. use the money available in cid element to issue change
      changeDue = changeDue - moneyInCurrentBills;
      //fix the float
      changeDue = changeDue.toFixed(2);
      //assign current array element (where arr[index] contains bill name (arr[index][0]) and amount of money available in that bill (arr[index][1])) to a variable
      let currentArrElement = cid[i];
      //set the money aside 
      changeBills.push(currentArrElement);
      //checkmark the first if statement as initiated and completed
      br++;
    }

    //assign the name of the bill we are working with to a variable (e.g. the element we are on in the loop looks like this -> ["TWENTY", 40], then assign "TWENTY" to a variable)
    let currentBillName = cid[i][0];
    //let's say the loop is on an element that looks like this -> ["TWENTY", 40], and changeDue = 64
    //the following if statement checks if one "TWENTY" is larger that changeDue and that the first if statement in the loop has not been initiated (remember br = 1 -> the program has successfully worked through the first if statemnt and depleted the money available in the current element of the array)
    //so if changeDue(64) > billValue[currentBillName](20) && br==0(first if statement has not been initiated and completed) execute the block of code within
    //essentially it will go through all twenty's available in the cash drawer and add them to changeBills arr, i.e. set them asside to issue change, decreasing the change due by the amount of 20's used, until change due amount is smaller then the nominal value itself after which we simply move to the next arrray element in the loop
    if (changeDue > billValues[currentBillName] && br == 0) { 
      let currentBill = billValues[currentBillName];
      //bills used counter
      let billsUsed = 0;
      //deplete current cid element of money until there is nothing left or change due amount is less then the bill nominal value
      while (changeDue >= currentBill && billsUsed < moneyInCurrentBills) {
        //decrease change due by the amount of money available in current bills, i.e. use the money available in cid element to issue change
        changeDue = changeDue - currentBill;
        //fix the float
        changeDue = changeDue.toFixed(2);
        //increase bill counter
        billsUsed = billsUsed + currentBill;
      }
      //create an array that will be used to collect the amount of money and bill used
      let arr = [];
      //add bill used
      arr.push(currentBillName);
      //add the amount of money used
      arr.push(billsUsed);
      //set money aside
      changeBills.push(arr);
    }
  }

  //if cid is missing bills required to issue exact change return appropriate status and empty array
  if (changeDue > 0) {
    return {
      status  : "INSUFFICIENT_FUNDS",
      change  : []
    };
  }
  //otherwise return appropriate status and an array containing bills and the amount of money neccessary to issue change
  else {
    return {
      status  : "OPEN",
      change  : changeBills
    };
  }

}

log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
