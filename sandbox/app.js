console.log("Starting app");

const fs = require("fs");
const os = require("os");
const notes = require("./notes.js");

let result = notes.addNote();
console.log(result);

let add = notes.add(9,2);
console.log(add);
//
//let user = os.userInfo();
//
//fs.appendFile("greetings.txt", `Hello ${user.username}, you are ${notes.age}!`, function(err){
//    if(err){
//        console.log("Unable to write to file");
//    }
//});