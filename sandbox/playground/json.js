//var obj = {
//    name: "Batsi"
//};
//
//var stringObj = JSON.stringify(obj);
////value stored in stringObj is a string and no longer an object
//
//console.log(typeof stringObj); //string
//
//console.log(stringObj); //{"name":"Batsi"}

// manually create JSON
let personString = '{ "name": "Batsi", "age": 25}';
// use JSON.parse() to get an object back from JSON
let person = JSON.parse(personString);

console.log(typeof person);
console.log(person);