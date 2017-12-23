const { ObjectID } = require("mongodb");
const { Todo } = require("./../../models/todo");
const { User } = require("./../../models/user");
const jwt = require("jsonwebtoken");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: "batsi@example.com",
    password: "userOnePass",
    tokens: [{
        access: "auth",
        token: jwt.sign({ _id: userOneId, access: "auth" }, "abc123").toString()
    }]
},
              {
    _id: userTwoId,
    email: "ruva@example.com",
    password: "userTwoPass"
              }];
 
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


const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo]);
    }).then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
    todos, populateTodos,
    users, populateUsers
};