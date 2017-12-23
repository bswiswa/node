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
            .set("x-auth", users[0].tokens[0].token)
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
        .set("x-auth", users[0].tokens[0].token)
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
        .set("x-auth", users[0].tokens[0].token)
        .expect(200)
        .expect((response)=> {
            expect(response.body.todos.length).toBe(1)
        })
        .end(done);
   });
});

describe("GET /todos/:id", () => {
    
    it("should return a todo", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .set("x-auth", users[0].tokens[0].token)
            .expect(200)
            .expect((response) => { expect(response.body.text).toBe(todos[0].text);
            })
            .end(done);
    });
    
    it("should not allow a user to get another user's todo", (done) => {
        request(app)
            .get(`/todos/${todos[1]._id}`)
            .set("x-auth", users[0].tokens[0].token)
            .expect(404)
            .expect(response => {
                expect(response.body).toEqual({});
            })
            .end(done);
    });
    
   it("should return 404 for an invalid ID", (done)=>{
      request(app)
       .get(`/todos/123`)
       .set("x-auth", users[0].tokens[0].token)
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
        .set("x-auth", users[0].tokens[0].token)
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
        .set("x-auth", users[1].tokens[0].token)
        .expect(200)
        .expect((response) => {
            expect(response.body.todo.text).toEqual(todos[1].text);
        })
        .end((err, response) => {
           if(err) return done(err);
            Todo.findById(idHex).then(todo => {
                expect(todo).toBeFalsy();
                done();
            }).catch(e => done(e));
        });
        
    });
    
    it("should not allow one user to delete another's todo", (done) => {
        request(app)
            .delete(`/todos/${todos[1]._id.toHexString()}`)
            .set("x-auth", users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
    
    it("should return 404 for an invalid id", (done)=>{
       request(app)
        .delete("/todos/123a")
        .set("x-auth", users[0].tokens[0].token)
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
            .set("x-auth", users[0].tokens[0].token)
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
            .set("x-auth", users[0].tokens[0].token)
            .send(update)
            .expect(200)
            .expect(response => {
            expect(response.body.todo).toMatchObject(update);
            expect(typeof response.body.todo.completedAt).toBe("number");
            })
            .end((err, response) => {
               if(err) return done(err);
                Todo.findById(idHex).then(todo => {
                    expect(todo.toObject()).toMatchObject(update);
                    done();
                }).catch(e => done(e));
            });
    });
    
    it("should clear completedAt when todo is not completed", (done)=>{
        let id = todos[1]._id.toHexString();
        let update = { completed: false };
        request(app)
            .patch(`/todos/${id}`)
            .set("x-auth", users[1].tokens[0].token)
            .send(update)
            .expect(200)
            .expect(response => {
                expect(response.body.todo).toMatchObject(update);
                expect(response.body.todo.completedAt).toBeFalsy();
            })
            .end((err, response) => {
            if(err) return done(err);
            Todo.findById(id).then(todo => {
                expect(todo.completed).toBe(false);
                expect(todo.completedAt).toBeFalsy();
                done();
            }).catch(e => done(e));
        });  
    });
    
    it("should not allow one user to update another's todo", (done) => {
        request(app)
            .patch(`/todos/${todos[1]._id.toHexString()}`)
            .set("x-auth", users[0].tokens[0].token)
            .send({ completed: false })
            .expect(404)
            .end((err, response) => {
                if(err)
                    return done(err);
            
                expect(response.body).toEqual({});
                Todo.findById(todos[1]._id).then(todo => {
                    expect(todo.completed).toBe(true);
                }).catch(e => done(e));
                done();
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
           expect(response.headers["x-auth"]).toBeTruthy();
           expect(response.body._id).toBeTruthy();
           expect(response.body.email).toBe(email);
        })
        .end(err => {
           if(err)
               return done(err);
           
           User.findOne({email}).then(user => {
               expect(user).toBeTruthy();
               expect(user.password).not.toBe(password);
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

describe("POST /users/login", () => {
    it("should login user and return auth token", (done) => {
        request(app)
            .post("/users/login")
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect(response => {
                expect(response.headers["x-auth"]).toBeTruthy();
            })
            .end((err, response) =>{
                if(err)
                    return done(err);
            
                User.findById(users[1]._id).then(user => {
                   expect(user.toObject().tokens[1]).toMatchObject({
                     access: "auth",
                       token: response.headers["x-auth"]
                   });
                    done();
                }).catch(e => done(e));
            });  
    });
    
    it("should reject invalid login", (done) => {
             request(app)
            .post("/users/login")
            .send({
                email: users[1].email,
                password: "12"
            })
            .expect(400)
            .expect(response => {
                expect(response.headers["x-auth"]).toBeFalsy();
            })
            .end((err, response)=>{
                 if(err)
                     return done(err);
                 //we expect no tokens to have been created for this user
                 User.findById(users[1]._id).then(user => {
                     expect(user.tokens.length).toBe(1);
                     done();
                 }).catch(e => done(e));
             });
    });
});

describe("DELETE /users/me/token", () => {
   it("should remove auth token on logout", (done) => {
      request(app)
        .delete("/users/me/token")
        .set("x-auth", users[0].tokens[0].token)
        .expect(200)
        .end((err, response) => {
          if(err)
              return done(err);
          
          expect(response.body).toEqual({});
          User.findById(users[0]._id).then(user => {
              expect(user.tokens.length).toBe(0);
              done();
          }).catch(e => done(e));  
      });
   });
});