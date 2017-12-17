const expect = require("expect");
const utils = require("./utils");

it("shoud add two numbers", () => {
   let res = utils.add(33, 11);
    expect(res).toBeA("number").toBe(44);
    
//   if(res !== 44 ) throw new Error(`Expected 44 but got ${res}`);
//    
});

it("should return the square of a number", () => {
    let res = utils.square(30);
    expect(res).toBeA("number").toBe(900);
});

it("should be equal", () => {
    expect({name: "Batsi"}).toEqual({ name: "Batsi"});
});

it("should return first and last name correctly", () => {
    let user = { age: 30 };
    let fullName = "Batsi Swiswa";
    utils.setName(user, fullName);
    expect(user).toInclude({ firstName: "Batsi"}).toEqual({ age: 30, firstName: "Batsi", lastName: "Swiswa"});
})