const jwt = require("jsonwebtoken");

let data = {
    id: 4
};

/*
jwt.sign takes the object and signs it -- creates the hash and returns the token value

jwt.verify takes the token and the secret and makes sure the data was not manipulated
*/

let token = jwt.sign(data, "123abc");
//token is sent back to user when they sign up or login.
//token is stored inside the tokens array
console.log(token);

let decoded = jwt.verify(token, "123abc");
console.log("Decoded", decoded);