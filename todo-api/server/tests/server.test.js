const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");
const { ObjectID } = require("mongodb");


const todos = [
    { _id: new ObjectID(), text: "Test todo 1"}, 
    { _id: new ObjectID(), text: "Test todo 2"}
    ];

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

describe("GET /todos/:id", () => {
    
    it("should return a todo", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((response) => { expect(response.body.text).toBe(todos[0].text);
            })
            .end(done);
    });
    
   it("should return 404 for an invalid ID", (done)=>{
      request(app)
       .get(`/todos/123`)
       .expect(404)
       .expect(response=>{
          expect(response.body).toEqual({});
        })
        .end(done);
   });
    
    it("should return 404 for a valid, non-existent ID", (done)=>{
        let id = new ObjectID().toHexString();
       request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .expect((response)=> {
           expect(response.body).toEqual({});
        })
        .end(done);
    });
});

describe("DELETE /todos/:id", () => {
    
    it("should delete a valid, existing id and return todo", (done) => {
        request(app)
        .delete(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((response) => {
            expect(response.body.text).toEqual(todos[0].text);
        })
        .end((err, response) => {
           if(err) return done(err);
            Todo.find().count().then(count => {
                expect(count).toBe(1);
                done();
            }).catch(e => done(e));
        });
        
    });
    
    it("should return 404 for an invalid id", (done)=>{
       request(app)
        .delete("/todos/123a")
        .expect(404)
        .expect((response) => {
           expect(response.body).toEqual({});
        })
        .end((err, response) => {
           if(err) return done(err);
           Todo.find().count().then( count => {
               expect(count).toBe(2);
               done();
           }).catch(e => done(e));
       });
    });
    
    it("should return 404 for a valid but non-existent id", (done) => {
        let id = new ObjectID();
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .expect(response => {
                expect(response.body).toEqual({});
            })
            .end((err, response) => {
            if(err) return done(err);
            Todo.find().count().then( count => {
                expect(count).toBe(2);
                done();
            }).catch(e => done(e));
        });
    });
});