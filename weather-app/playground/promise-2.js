const geocode = require("../geocode/geocode");
const weather = require("../weather/weather");
const yargs = require("yargs");

let argv = yargs.options({
    a: {
        demand: true,
        string: true,
        alias: "address"
        }
    })
    .help()
    .alias("--help", "-h")
    .argv;

let geocodeAddress = (address) => {
    return new Promise((resolve, reject)=>{
        geocode.geocodeAddress(address, (errorMessage, results)=>{
        if(errorMessage)
        reject(errorMessage);
    else{
        console.log(`Address: ${results.address}\nLat ${results.lat}\n Long ${results.lng}`);
        resolve(results);
    }
    });                         
    });                       
};

let weatherFetch = (results) => {
    return new Promise((resolve, reject)=>{
            console.log(results.lat);
        console.log(results.lng);
             weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults)=>{
            if(errorMessage)
                reject(errorMessage);
            else
                resolve(`Summary: ${weatherResults.summary}\nTemperature: ${weatherResults.temperature}\nIt feels like ${weatherResults.apparentTemperature} deg F`);
        });
    });
};

geocodeAddress(argv.a)
    .then((results)=>{
    return weatherFetch(results);
}, (errorMessage)=> console.log(errorMessage))
    .then((summary)=> console.log(summary), (errorMessage)=> console.log(errorMessage));
