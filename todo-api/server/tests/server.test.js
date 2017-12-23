const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");
const { User } = require("./../models/user");
const { ObjectID } = require("mongodb");
const { todos, populateTodos, users, populateUsers } = require("./seed/seed");

//a testing lifecycle method. Allows us to run some code before we run each test case
beforeEach(populateUsers);
beforeEach(populateTodos);
           
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
        let idHex = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${idHex}`)
        .expect(200)
        .expect((response) => {
            expect(response.body.todo.text).toEqual(todos[1].text);
        })
        .end((err, response) => {
           if(err) return done(err);
            Todo.findById(idHex).then(todo => {
                expect(todo).toNotExist();
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

describe("PATCH /todos/:id", () => {
    it("should update the todo", (done)=>{
       let idHex = todos[0]._id.toHexString();
        let update = { text: "some update", completed: true };
        request(app)
            .patch(`/todos/${idHex}`)
            .send(update)
            .expect(200)
            .expect(response => {
            expect(response.body.todo).toInclude(update);
            expect(response.body.todo.completedAt).toBeA("number");
            })
            .end((err, response) => {
               if(err) return done(err);
                Todo.findById(idHex).then(todo => {
                    expect(todo).toInclude(update);
                    done();
                }).catch(e => done(e));
            });
    });
    
    it("should clear completedAt when todo is not completed", (done)=>{
        let id = todos[1]._id.toHexString();
        let update = { completed: false };
        request(app)
            .patch(`/todos/${id}`)
            .send(update)
            .expect(200)
            .expect(response => {
                expect(response.body.todo).toInclude(update);
                expect(response.body.todo.completedAt).toNotExist();
            })
            .end((err, response) => {
            if(err) return done(err);
            Todo.findById(id).then(todo => {
                expect(todo.completed).toBe(false);
                expect(todo.completedAt).toNotExist();
                done();
            }).catch(e => done(e));
        });
        
        
    });
});

describe("GET /users/me", ()=> {
   it("should return user if authenticated", (done) => {
      request(app)
       .get("/users/me")
       .set("x-auth", users[0].tokens[0].token) //set header
       .expect(200)
       .expect((response) => {
          expect(response.body._id).toBe(users[0]._id.toHexString());
          expect(response.body.email).toBe(users[0].email);
      })
       .end(done);
       
   });
    
    it("should return 401 if not authenticated", (done) => {
        request(app)
            .get("/users/me")
            .expect(401)
            .expect((response) => {
            expect(response.body).toEqual({});
            })
            .end(done);
    });
});

describe("POST /users", () => {
   it("should create a user", (done)=>{
       let email = "example@example.com";
       let password = "123456"
       
       request(app)
        .post("/users")
        .send({ email, password})
        .expect(200)
        .expect((response) => {
           expect(response.headers["x-auth"]).toExist();
           expect(response.body._id).toExist();
           expect(response.body.email).toBe(email);
        })
        .end(err => {
           if(err)
               return done(err);
           
           User.findOne({email}).then(user => {
               expect(user).toExist();
               expect(user.password).toNotBe(password);
               done();
           }).catch(e => done(e));
       });
       
   });
    
    it("should return validation errors if request is invalid", (done) => {
        let invalidEmail = "123456", invalidPassword = "123";
        request(app)
            .post("/users")
            .send({email: invalidEmail, password: invalidPassword})
            .expect(400)
            .end(done);
    });
    
    it("should not create a user if email is in use", (done) => {
        let duplicate = users[0].email;
        let password = "123456";
        request(app)
            .post("/users")
            .send({ email: duplicate, password})
            .expect(400)
            .end(done);  
    });
});