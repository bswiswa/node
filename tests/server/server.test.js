const request = require("supertest");
const app = require("./server").app;
const expect = require("expect");

it("should return 404 response", (done) => {
    request(app)
        .get("/")
//        .expect(404)
        .expect(200)
        .expect("Hello world")
//        .expect((response) => {
//            expect(response.body).toInclude({
//                error: "Page not found"
//            });
//        }) 
        .end(done);
});

it("should return a an array of users", (done) => {
    request(app)
        .get("/users")
        .expect(200)
        .expect((response) => {
            expect(response.body).toInclude("Batsi")
        })
        .end(done);
});