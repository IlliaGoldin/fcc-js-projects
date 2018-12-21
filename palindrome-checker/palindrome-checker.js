//Challenge description that outlines a problem this code solves is available here LINK

//make life easier
let log = console.log;

//palindrome function checks if a passed string is a palindrome
// it accepts a string value and returns a boolean 
function palindrome(str) {
  let regex = /\W+|_/gi;
  let parsedStr = str.toLowerCase().replace(regex, "");
  let parsedStrReversed = parsedStr.split("").reverse().join("");
  if (parsedStr === parsedStrReversed) {
    return true;
  }
  else {
    return false;
  }
}

log(palindrome("eye"));