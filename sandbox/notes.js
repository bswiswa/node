console.log("Starting notes.js");

const fs = require("fs");

let fetchNotes = () => {
        //not sure if notes-data.json file exists so try
    try{
        //get previous notes in our data file first
      let notesString = fs.readFileSync("notes-data.json");
      return JSON.parse(notesString);
    }catch(e){
        console.log("No previous notes loaded");
        return [];
    }
};

let saveNotes = (notes) => {
   fs.writeFileSync("notes-data.json", JSON.stringify(notes));   
}

let addNote = (title, body) => {
    let notes = fetchNotes();
    var note = {
      title,
        body
    };
    
    /*filter takes a callback function which is called once for every item in the array. If the callback function returns true, that item is added to the output array, in this case duplicateNotes
    */
    let duplicateNotes = notes.filter(note => note.title === title);
    //notice that arrow function needs no curly braces or return statement if we have one expression
    
    //duplicateNotes should be an empty array if that title is not already in our notes
    if(duplicateNotes.length === 0){   
        //add new note
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

let getAll = () => {
    console.log("getting all notes");   
};

let read = (title) =>{
    console.log("reading ", title);
}

let remove = (title) => {
    console.log("removing ", title);
}
//In ES6, if an object property's key is exactly equal to a variable name, we can just include the variable and not have to write the { keyName:keyName }notation but just { keyName }
module.exports = {
    addNote, 
    getAll,
    read,
    remove
};