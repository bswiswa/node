var obj = {
    name: "Batsi"
};

var stringObj = JSON.stringify(obj);
//value stored in stringObj is a string and no longer an object
console.log(typeof stringObj);
console.log(stringObj);