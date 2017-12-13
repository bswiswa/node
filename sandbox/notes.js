console.log("Starting notes.js");

let addNote = (title, body) => {
    console.log("adding note", title, body);
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