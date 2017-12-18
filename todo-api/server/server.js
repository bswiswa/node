let mongoose = require("mongoose");
//Mongoose supports promises or callbacks. We want to use the promises we have been using before not some other third party Promises library.
mongoose.Promise = global.Promise;
//note that the global object is above the process and it encloses it ie global.process === process

//connect to database
mongoose.connect("mongodb://localhost:27017/TodoApp");

//create a model so Mongoose knows how to store our data
let Todo = mongoose.model("Todo", 
{
    text: {
        type: String
    },
    completed: {
        type: Boolean
    }, completedAt: {
        type: Number
    }
});

create an instance
let aTodo = new Todo({ text: "Make dinner"});

aTodo.save().then((result)=>{
   console.log(`Saved todo ${result}`) 
}, (err)=> {
   console.log("Unable to save Todo", err); 
});

let tasks = ["Take out trash", "Clean house", "Hang up Christmas tree lights", "Study", "Read for pleasure"];
for(let i=0; i < 5; i++){
   let todo = new Todo({ text: tasks[i], completed: (i%2 == 0)? true: false});
    todo.save().then((result)=>{console.log(`todo saved successfully ${JSON.stringify(result, undefined, 2)}`);}, (err)=>{ console.log("Could not save todo", err)});
}

            