const yargs = require('yargs');
const axios = require("axios");

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

let encodedAddress = encodeURIComponent(argv.a);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

//axios has promises built in and so we can automatically use functions like then on its function returns

axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === "ZERO_RESULTS"){
        throw new Error("Unable to find that address");
    }
    console.log(`Location:  ${response.data.results[0].formatted_address}`);
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    weatherUrl = `https://api.darksky.net/forecast/95ab2c8c9f2e65c34124f0786d028a1a/${lat},${lng}`;
   
    return axios.get(weatherUrl);
}).then((response)=>{
    let temp = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temp}. It feels like ${apparentTemperature}`);
}).catch(e =>{
    if(e.code === "ENOTFOUND")
        console.log("Unable to connect to API servers");
    else{
        console.log(e.message);
    }
} );