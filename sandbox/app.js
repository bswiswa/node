const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

const argv = yargs.argv;
let command = argv._[0];

if(command === "add"){
    console.log("adding new note...");
    let note = notes.addNote(argv.title, argv.body);
    if(note) {
        console.log("Note added successfully");
        notes.logNote(note);
    }
    else console.log("Note already exists, nothing added");
    
}else if(command === "list"){
    let allNotes = notes.getAll();
    console.log(`listing ${allNotes.length} notes...`);
    allNotes.forEach(notes.logNote);
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
