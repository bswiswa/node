const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");


const todos = [{ text: "Test todo 1"}, { text: "Test todo 2"}];
//a testing lifecycle method. Allows us to run some code before we run each test case
beforeEach((done) => {
    Todo.remove({})
        .then(() => Todo.insertMany(todos))
        .then(()=> done())
        .catch(e => console.log(e));
});
           
describe("POST /todos", ()=> {
   it("should create a new todo", (done) => {
       let text = "Test adding a todo";
        request(app)
            .post("/todos")
            .send({ text })
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text);
            })
            .end((err, response) => {
                if(err){
                    return done(err);
                }    
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
        });
   });
    
   it("should not add an empty todo", (done)=>{
        request(app)
        .post("/todos")
        .send({})
        .expect(400)
        .end((err, response)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch( e => done(e));
        })
   });
});


describe("GET /todos", ()=> { 
   it("should get all todos", (done)=> {
        request(app)
        .get("/todos")
        .expect(200)
        .expect((response)=> {
            expect(response.body.todos.length).toBe(2)
        })
        .end(done);
   });
});