console.log("Starting app");

const fs = require("fs");
const os = require("os");
const notes = require("./notes.js");
const _ = require("lodash");


console.log(_.isString(true));
console.log(_.isString("true"));
let filteredArray = _.uniq("Batsirai1Batsirai1234");
console.log(filteredArray);

//let result = notes.addNote();
//console.log(result);
//
//let add = notes.add(9,2);
//console.log(add);
//
//let user = os.userInfo();
//
//fs.appendFile("greetings.txt", `Hello ${user.username}, you are ${notes.age}!`, function(err){
//    if(err){
//        console.log("Unable to write to file");
//    }
//});