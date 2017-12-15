const request = require('request');

//request(optionsObject, callback)
request({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=4%20Burr%20Street%20New%20Haven%20CT",
    json: true
}, (error, response, body)=>{
    console.log(body);
});