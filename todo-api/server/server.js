let express = require("express");
let bodyParser = require("body-parser");

let { mongoose } = require("./db/mongoose");
let { Todo } = require("./models/todo");
let { User } = require("./models/user");

let app = express();

//bodyParser takes JSON and converts it into an object and attaches it to the body of the request
app.use(bodyParser.json());

//configuring routes
//CRUD - create, read, update, delete
app.post("/todos", (request, response) => {
    let todo = new Todo({ text: request.body.text });
    todo.save().then((result)=>{ response.send(result)}, (err)=> { response.status(400).send(err)});
});

app.listen(3000, () => {
    console.log("App started on port 3000");
});
            