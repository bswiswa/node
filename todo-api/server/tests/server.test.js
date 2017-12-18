const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

//a testing lifecycle method. Allows us to run some code before we run each test case
beforeEach((done) => {
    Todo.remove({}).then(()=> done(), (err) => console.log("Could not run test lifecycle method", err));
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
                Todo.find().then((todos) => {
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
                expect(todos.length).toBe(0);
                done();
            }).catch( e => done(e));
        })
   });
});

    
});