console.log("Starting notes.js");

module.exports.addNote = ()=>{
    console.log("adding note");
    return "a note";
};

module.exports.add = (a, b)=>{
    console.log(`adding ${a} and ${b}`);
    return a+b;
};