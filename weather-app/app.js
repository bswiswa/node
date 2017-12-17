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

geocode.geocodeAddress(address)
    .then((location)=>{
    console.log(`Address: ${location.address}`);
    return weather.getWeather(location.lat, location.lng);
    }).then((forecast)=>{
        console.log(`Summary: ${forecast.summary}\nTemperature: ${forecast.temperature}\nIt feels like ${forecast.apparentTemperature} deg F`);
    }).catch( errorMessage => console.log(errorMessage));

