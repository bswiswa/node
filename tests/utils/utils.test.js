const expect = require("expect");
const utils = require("./utils");

describe("Utils", ()=> {
    describe("add", ()=>{
        it("should add two numbers", () => {
            let res = utils.add(33, 11);
            expect(res).toBeA("number").toBe(44);

            //   if(res !== 44 ) throw new Error(`Expected 44 but got ${res}`);   
        }); 
        
        it("should async add two numbers", (done) => {
            utils.asyncAdd(4,3, (sum)=>{
            expect(sum).toBeA("number").toBe(7);
                done();
            }); 
        });
    });
    
    describe("square", ()=>{
        it("should return the square of a number", () => {
            let res = utils.square(30);
            expect(res).toBeA("number").toBe(900);
        });

    

        it("should async square a number", (done) => {
            utils.asyncSquare(5, (square) => {
            expect(square).toBeA("number").toBe(25);
            done();
            });
        });
        
    });
    
});


//it("should be equal", () => {
//    expect({name: "Batsi"}).toEqual({ name: "Batsi"});
//});
//
//it("should return first and last name correctly", () => {
//    let user = { age: 30 };
//    let fullName = "Batsi Swiswa";
//    utils.setName(user, fullName);
//    expect(user).toInclude({ firstName: "Batsi"}).toEqual({ age: 30, firstName: "Batsi", lastName: "Swiswa"});
//});


