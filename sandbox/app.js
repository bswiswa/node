const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");


const titleOption = {
                describe: "Title of note",
                demand: true,
                alias: "t"
                    };

const bodyOption = {
                describe: "Body of note",
                demand: true,
                alias: "b"
};

const argv = yargs
                .command("add", "Add a new note", {
                    title: titleOption,
                    body: bodyOption
                })
                .command("list", "List all notes")
                .command("read", "Read a note", {
                    title: titleOption
                })
                .command("remove", "Remove a note", {
                    title: titleOption
                })
                .help()
                .argv;

/* the command() function takes in a command string, a user-friendly message and an options object. 
The key in the options object is the property name and the value is another object which specifies how that property should work. It has the fields describe (string), demand (boolean variable of whether it is required or not), alias (short cut)

 help() enables us to call the --help flag eg node app.js --help
 
 */

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
