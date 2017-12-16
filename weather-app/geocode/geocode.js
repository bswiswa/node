const request = require("request");

let geocodeAddress = (address, printResults) => {
    let encodedAddress = encodeURIComponent(address);
    
    //request(optionsObject, callback)
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    },(error, response, body)=>{
        if(error){
            printResults("Unable to connect to Google servers");
        } else if(body.status === "ZERO_RESULTS"){
            printResults("Unable to find that address");
        }else if(response.statusCode === 200 && body.status === "OK"){
            let address = body.results[0].formatted_address;
            let location = body.results[0].geometry.location;
            results = {
                address,
                lat: location.lat,
                lng: location.lng
            };
            printResults(undefined, results);
            console.log(`Address: ${address}\nLongitude: ${location.lng}\nLatitude: ${location.lat}`);
        }
});
    
}

module.exports = {
    geocodeAddress
};