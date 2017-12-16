//const yargs = require('yargs');
//const geocode = require('./geocode/geocode')
//const argv = yargs
//                .options({
//                    a: { 
//                        demand: true,
//                        alias: "address",
//                        describe: "Address to fetch weather for",
//                        string: true
//                    }
//                })
//                .help()
//                .alias("help", "h")
//                .argv;
//
//let address = argv.a;
//geocode.geocodeAddress(address, (errorMessage, results) => {
//    if(errorMessage)
//        console.log(errorMessage);
//    else
//        console.log(JSON.stringify(results, undefined, 2));
//});


//Dark Sky API key 95ab2c8c9f2e65c34124f0786d028a1a
const request = require("request");

request({
    url: "https://api.darksky.net/forecast/95ab2c8c9f2e65c34124f0786d028a1a/-17.8251657,31.03351",
    json: true
}, (error, response, body) => {
        if(!error && response.statusCode === 200){
            let summary = body.currently.summary;
            let temp = body.currently.temperature;
            console.log(`Summary: ${summary}\nTemperature: ${temp}`);
        }
        else{
            console.log("Unable to fetch weather");
        }
        
    });