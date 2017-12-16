const yargs = require('yargs');
const geocode = require('./geocode/geocode')
const weather = require("./weather/weather");

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

geocode.geocodeAddress(address, (errorMessage, results) => {
    if(errorMessage)
        console.log(errorMessage);
    else{
        weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults)=>{
            if(errorMessage)
                console.log(errorMessage);
            else
                console.log(`Summary: ${weatherResults.summary}\nTemperature: ${weatherResults.temperature}\nIt feels like ${weatherResults.apparentTemperature} deg F`);
        });
    }
});



