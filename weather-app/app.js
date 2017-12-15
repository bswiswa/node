const request = require('request');

//request(optionsObject, callback)
request({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=4%20Burr%20Street%20New%20Haven%20CT",
    json: true
}, (error, response, body)=>{
    console.log(JSON.stringify(body, undefined, 2));
    /*
    JSON.stringify takes the object, and an object specifying the fields you want to filter, last is an integer specifying the number of spaces for indentation
    */
});