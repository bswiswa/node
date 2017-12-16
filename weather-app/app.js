const request = require('request');
const yargs = require('yargs');

const argv = yargs
                .options({
                    a: { 
                        demand: true,
                        alias: "address",
                        describe: "Address to fetch weather for",
                        string: true
                    }
                })
                .help()
                .alias("help", "h")
                .argv;

let address = argv.a;
let encodedAddress = encodeURIComponent(address);

//request(optionsObject, callback)
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
}, (error, response, body)=>{
    if(response.statusCode == 200){
        if(body.results[0]){
            let address = body.results[0].formatted_address;
            let location = body.results[0].geometry.location;
            console.log(`Address: ${address}\nLongitude: ${location.lng}\nLatitude: ${location.lat}`);
        }else{
            console.log("No result found, modify address");
        }
    }
});