//Challenge description that outlines a problem this code solves is available here LINK

//make life easier
let log = console.log;

//convertToRoman function converts an arabic numeral to a roman numeral
//it accepts a number and returns a string value
function convertToRoman(num) {
let decimalValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
  let romanNumeral = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

  let romanized = '';

  for (let index = 0; index < decimalValue.length; index++) {
    while (decimalValue[index] <= num) {
      romanized += romanNumeral[index];
      num -= decimalValue[index];
    }
  }

  return romanized;  
}

log(convertToRoman("29"));