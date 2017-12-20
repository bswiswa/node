let express = require("express");
let bodyParser = require("body-parser");

let { mongoose } = require("./db/mongoose");
let { Todo } = require("./models/todo");
let { User } = require("./models/user");
const { ObjectID } = require("mongodb");

let app = express();
//if not deployed use 3000
const port = process.env.PORT || 3000;

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
        response.send(todo);
    }).catch(e => response.status(400).send());
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

module.exports = { app };