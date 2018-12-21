//make life easier
let log = console.log;

//telephoneCheck function is a phone number format validator
//it accepts a string and returns a boolean
function telephoneCheck(str) {
   let regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/; 
   return regex.test(str);
}

log(telephoneCheck("555-555-5555"));
