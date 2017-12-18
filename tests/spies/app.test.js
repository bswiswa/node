const expect = require("expect");
const rewire = require("rewire");

let app = rewire("./app");
/* rewire loads the app through require but adds two methods:
app.__set__ and app.__get__
We can use these functions to mock out various data inside app.js
*/

describe("App", () => {
    let db = {
        saveUser: expect.createSpy()
    };
    //swap out the db variable in app with the one we have here with the spy
    app.__set__("db", db);
    
    it("should call saveUser with user object", ()=>{
       let email = "dz@gmail.com";
       let password = "123456";
        app.handleSignup(email, password);
        /* not that the handleSignUp is called but its db variable is now set to the one here and so the spy is called
        */
        expect(db.saveUser).toHaveBeenCalledWith({ email, password});
    });
    
   it("should call the spy correctly", () => {
       let spy = expect.createSpy();
       //call the spy here for illustration purposes
       spy("Andrew", 25);
       expect(spy).toHaveBeenCalledWith("Andrew", 25);
   }); 
});