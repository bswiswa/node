let db = require("./db");

module.exports.handleSignup = (email, password) => {
    //check if email exists
    
    db.saveUser({ email, password });
    
    //send welcome email
};