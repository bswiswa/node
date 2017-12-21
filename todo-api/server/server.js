require("./config/config.js");
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

let { mongoose } = require("./db/mongoose");
let { Todo } = require("./models/todo");
let { User } = require("./models/user");


let app = express();
//if not deployed use 3000
const port = process.env.PORT;

//bodyParser takes JSON and converts it into an object and attaches it to the body of the request
app.use(bodyParser.json());

//configuring routes
//CRUD - create, read, update, delete
app.post("/todos", (request, response) => {
    let todo = new Todo({ text: request.body.text });
    todo.save().then((result)=>{ response.send(result)}, (err)=> { response.status(400).send(err)});
});

app.get("/todos", (request, response) => {
   Todo.find().then((todos)=>{
       //better to send an object as we can use that object more flexibly later
       response.send({ todos });
   }, (err)=> { 
       response.status(400).send(err);
    });
});

//URL parameter :name.  Creates a name variable on the request.params object
app.get("/todos/:id", (request, response)=> {
    let id = request.params.id;
    if(!ObjectID.isValid(id)){
      return response.status(404).send();  
    }
    Todo.findById(id).then(todo => {
        if(!todo) return response.status(404).send();
        response.send(todo);
    }).catch(e => response.status(400).send());
    //leave out sending error back because it may contain sensitive information
});

app.delete("/todos/:id", (request, response) => {
    let id = request.params.id;
    if(!ObjectID.isValid(id)){
     return response.status(404).send();   
    }
    Todo.findByIdAndRemove(id).then(todo => {
        if(!todo) return response.status(404).send();
        response.send({ todo });
    }).catch(e => response.status(400).send());
});

//HTTP patch method is used to update a resource
app.patch("/todos/:id", (request, response) => {
    let id = request.params.id;
    /* prevent user from editing other properties besides text and completed. lodash's pick method creates an object derived from another object but with only select fields specified in the array
    */
    let body = _.pick(request.body, ["text", "completed"]);
    if(!ObjectID.isValid(id)) return response.status(404).send();
    
    //setting completed and updating completedAt
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    
    Todo.findByIdAndUpdate(id, { $set: body}, { new: true }).then(todo =>{
            if(!todo) return response.status(404).send();
            response.status(200).send({ todo });   
    }).catch(e => response.status(404).send()); 
});

//POST /users
app.post("/users", (request, response) => {
   let body = _.pick(request.body, ["email", "password"]);
    let user = new User(body);
    user.save().then(result => {
        response.status(200).send(user.email);
    }).catch(e => response.status(400).send(e))
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

module.exports = { app };