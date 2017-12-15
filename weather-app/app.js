const request = require('request');

//request(optionsObject, callback)
request({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=4%20Burr%20Street%20New%20Haven%20CT",
    json: true
}, (error, response, body)=>{
    if(response.statusCode == 200){
        let address = body.results[0].formatted_address;
        let location = body.results[0].geometry.location;
        console.log(`The address is ${address}. The longitude and latitude of this address are ${location.lat} and ${location.lng}`);
    }
});