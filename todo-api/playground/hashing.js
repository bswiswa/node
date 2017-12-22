const bcrypt = require("bcryptjs");

let password = "123abc!";
/*we have to call two methods
1 genSalt - generates a salt we can use on our password. Takes in a number of rounds so noone can brute force the password.
2 hash - hashes password
*/

//bcrypt.genSalt(10, (err, salt) => {
//    bcrypt.hash(password, salt, (err, hash) => {
//       console.log(hash); 
//    });
//});

let hashedPassword = "$2a$10$4PmUe1.ke862PzeGlEwOdOLCbJ1GJ/MQ..DGyPl6rhT52yisIQ14a";

bcrypt.compare("123ab", hashedPassword, (err, result) => {
    console.log(result);
});

//const jwt = require("jsonwebtoken");

/*let data = {
    id: 4
};
*/
/*
jwt.sign takes the object and signs it -- creates the hash and returns the token value

jwt.verify takes the token and the secret and makes sure the data was not manipulated
*/

//let token = jwt.sign(data, "123abc");
//token is sent back to user when they sign up or login.
//token is stored inside the tokens array
//console.log(token);

//let decoded = jwt.verify(token, "123abc");
//console.log("Decoded", decoded);