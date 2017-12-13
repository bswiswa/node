//var obj = {
//    name: "Batsi"
//};
//
//var stringObj = JSON.stringify(obj);
////value stored in stringObj is a string and no longer an object
//
//console.log(typeof stringObj); //string
//
//console.log(stringObj); //{"name":"Batsi"}

// manually create JSON
//let personString = '{ "name": "Batsi", "age": 25}';
//// use JSON.parse() to get an object back from JSON
//let person = JSON.parse(personString);
//
//console.log(typeof person);
//console.log(person);

//require file system module
const fs = require("fs");

//create our object
let originalNote = {
    title: "Some title",
    body: "some body"
};

//JSONify
let originalNoteString = JSON.stringify(originalNote);
//write to file. Note that file has to have .json extension
fs.writeFileSync("notes.json", originalNoteString);

//read object from file and print a property to verify
let noteString = fs.readFileSync("notes.json");
let note = JSON.parse(noteString);

console.log(`title: ${note.title}, body: ${note.body}`);