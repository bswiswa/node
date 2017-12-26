require("./config/config.js");
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

let { mongoose } = require("./db/mongoose");
let { Todo } = require("./models/todo");
let { User } = require("./models/user");
let { authenticate } = require("./middleware/authenticate");


let app = express();
//if not deployed use 3000
const port = process.env.PORT;

//bodyParser takes JSON and converts it into an object and attaches it to the body of the request
app.use(bodyParser.json());

//configuring routes
//CRUD - create, read, update, delete
app.post("/todos", authenticate, async (request, response) => {
    try{
        let todo = new Todo({ text: request.body.text, _creator: request.user._id });
        await todo.save();
        response.send(todo);
    }catch(e){
      response.status(400).send(e);  
    }
});

app.get("/todos", authenticate, async (request, response) => {
    try{
        let todos = await Todo.find({ _creator: request.user._id }); 
        //better to send an object as we can use that object more flexibly later
        response.send({ todos }); 
    }catch(e){
        response.status(400).send(e);
    }
});

//URL parameter :name.  Creates a name variable on the request.params object
app.get("/todos/:id", authenticate, async (request, response) => {
    try{
        let id = request.params.id;
        if(!ObjectID.isValid(id)){
            return response.status(404).send();  
        }
        let todo = await Todo.findOne({_creator: request.user._id, _id: new ObjectID(id)});
        if(!todo) 
            return response.status(404).send();
        
        response.send(todo);
    }catch(e){
       response.status(400).send(); 
    }
    //leave out sending error back because it may contain sensitive information
});

app.delete("/todos/:id", authenticate, async (request, response) => {
    try{
        let id = request.params.id;
        if(!ObjectID.isValid(id)){
            return response.status(404).send();   
        }
        let todo = await Todo.findOneAndRemove({ _creator: request.user._id, _id: new ObjectID(id)});
        if(!todo)
            return response.status(404).send();
        
        response.send({ todo });
    }catch(e){
      response.status(400).send();  
    }
});

//HTTP patch method is used to update a resource
app.patch("/todos/:id", authenticate, async (request, response) => {
    try{
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
        let todo = await Todo.findOneAndUpdate({ _creator: request.user._id, _id: id }, { $set: body}, { new: true });
        if(!todo) 
            return response.status(404).send();
        
        response.status(200).send({ todo }); 
    }catch(e){
       response.status(404).send() 
    }
});

//POST /users
app.post("/users", async (request, response) => {
    try{
        let body = _.pick(request.body, ["email", "password"]);
        let user = new User(body);
        await user.save();
        let token = await user.generateAuthToken();
        response.header("x-auth", token).send(user);
    }catch(e){
        response.status(400).send(e);
    }
});

//GET /users/me
app.get("/users/me", authenticate, (request, response) => {
   response.send(request.user);
});

//POST /users/login
app.post("/users/login", async (request, response) => {
    try{
        let body = _.pick(request.body, ["email", "password"]);
        let user = await User.findByCredentials(body.email, body.password);
        let token = await user.generateAuthToken();
        response.header("x-auth", token).send(user);
    }catch(e){
        response.status(400).send();
    }
});

//DELETE /users/me/token
app.delete("/users/me/token", authenticate, async (request, response) => {
    try{
      await request.user.removeToken(request.token);
        response.status(200).send();  
    }catch(e){
       response.status(400).send(); 
    }
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

module.exports = { app };