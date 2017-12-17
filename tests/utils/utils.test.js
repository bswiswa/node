const utils = require("./utils");

it("shoud add two numbers", () => {
   let res = utils.add(33, 11);
   if(res !== 44 ) throw new Error(`Expected 44 but got ${res}`);
    
});

it("should return the square of a number", () => {
    let res = utils.square(30);
    if(res !== 900) throw new Error(`Expected 9 but got ${res}`);
});