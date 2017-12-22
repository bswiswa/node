const { ObjectID } = require("mongodb");
const { Todo } = require("./../../models/todo");

const todos = [
    { _id: new ObjectID(), text: "Test todo 1"}, 
    { _id: new ObjectID(), text: "Test todo 2", completed: true, completedAt: 333 }
    ];

//a testing lifecycle method. Allows us to run some code before we run each test case
const populateTodos = (done) => {
    Todo.remove({})
        .then(() => Todo.insertMany(todos))
        .then(()=> done())
        .catch(e => console.log(e));
};

module.exports = {
    todos, populateTodos
};