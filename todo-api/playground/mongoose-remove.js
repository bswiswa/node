const { ObjectID } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");


//delete one
Todo.find().then(todos => {
    todos.forEach(el=>
        console.log(JSON.stringify(el, undefined, 2)));
}).catch(e => console.log(e));

let id = "5a39b4f887ec010e4f8edcb5";
if(!ObjectID.isValid(id)) console.log("invalid id");

/* remove({}) -- deletes multiple documents. No documents returned, just a result object with number of documents removed and other properties
*/
Todo.remove({}).then((result)=> console.log(result)).catch(e => console.log(e));

//findOneAndRemove() - returnse the removed document
Todo.findOneAndRemove({ _id: "5a39b4f887ec010e4f8edcb5"}).then((del)=> console.log("deleted", del)).catch(e => console.log(e));

//findByIdAndRemove()
Todo.findByIdAndRemove("5a39b4f887ec010e4f8edcb4").then(todo => console.log("deleted", todo)).catch(e => console.log(e));