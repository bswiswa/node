//play around with querying with Mongoose
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user")
const { ObjectID } = require("mongodb");

//a valid object ID which may or may not be in database
let id = "5a3867c6315e62c205bdd3e6";


//can use the isValid method to check format of id before searching
if(!ObjectID.isValid(id)) return console.log("ID is not valid");

/*Mongoose automatically creates ObjectIds
returns an array of documents. Empty array if object doesn't exist.
*/
Todo.find({ _id: id}).then((todos)=>{
    if(todos.length < 1) return console.log("id not found");
    console.log("Todos find", todos);
});

//first matching doc returned not an array. Get null back if object doesn't exist
Todo.findOne({ _id: id }).then((todo)=>{
    if(!todo) return console.log("id not found");
    console.log("Todo findOne", todo);
});

Todo.findById(id).then((todo)=>{
    if(!todo) return console.log("id not found");
   console.log("Todo findFindById", todo); 
}).catch(e => console.log(e));


let userId = "5a380919341257293a0e4263";
User.find({ _id: userId}).then(users =>{
    if(users.length < 1) return console.log("unable to find user", userId);
    console.log("users array", users);
} ).catch(e => console.log(e));

User.findOne({ _id: userId }).then(user=> {
    if(!user) return console.log("unable to find user", userId);
    console.log("userObj", user);   
} ).catch(e => console.log(e));

User.findById({ _id: userId}).then(user =>{
    if(!user) return console.log("unable to find user", userId);
    console.log("user", user);
} ).catch(e => console.log(e));