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



            