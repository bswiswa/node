console.log("Starting app");

const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

const argv = yargs.argv;
let command = argv._[0];

console.log("process.argv", process.argv) ;
console.log("yargs.argv", argv);


if(command === "add"){
    console.log("adding new note...");
    let note = notes.addNote(argv.title, argv.body);
    if(note) {
        console.log("Note added successfully");
        notes.logNote(note);
    }
    else console.log("Note already exists, nothing added");
    
}else if(command === "list"){
    console.log("listing all notes...");
    notes.getAll();
}else if(command === "read"){
    let note = notes.read(argv.title);
    if(note){
        console.log("Reading note...");
        notes.logNote(note);
    }else console.log("Note not found");
    
}else if(command === "remove"){
    console.log("removing note...")
    notes.remove(argv.title);
}
else{
    console.log("command not recognized");
}
