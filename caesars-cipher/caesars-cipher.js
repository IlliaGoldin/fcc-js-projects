//Challenge description that outlines a problem this code solves is available here LINK

//make life easier
let log = console.log;

//rot13 function decodes a string in Caesars Cipher
//it accepts a string value and returns a decoded string value
function rot13(str) {
    let decoded = "";
    let regex = /\w/i;

    //iterate through str and create new decoded str
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        let charMatchIndex = char.search(regex);

        //if current character is a letter -> decipher and add to decoded str
        if (charMatchIndex == 0) {
            let charUtf = char.charCodeAt(0);
            if (charUtf > 77) {
                let utfLetterBase = 64;
                //find utf-16 code of decoded letter and assign it to a variable
                let charCode = utfLetterBase + (13 - (90 - charUtf)); //should be a function, but out of scope of this challenge
                let charCodeToString = String.fromCharCode(charCode);
                decoded += charCodeToString;
            }
            else {
                //find utf-16 code of decoded letter and assign it to a variable
                let charCode = char.charCodeAt(0) + 13; //should be a function, but out of scope of this challenge
                let charCodeToString = String.fromCharCode(charCode); 
                decoded += charCodeToString;
            }
        }
        //if current character is not a letter -> do not decipher and add to decoded str as it is
        else {
            decoded += char;
        }
    }
    return decoded;
}

log(rot13("SERR PBQR PNZC"));