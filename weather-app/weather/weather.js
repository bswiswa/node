const request = require('request');

//Dark Sky API key 95ab2c8c9f2e65c34124f0786d028a1a
/* to make a forecast request
 "https://api.darksky.net/forecast/[key]/lat,long
 */
let getWeather = (lat, lng) => {
    return new Promise((resolve, reject)=> {
        request({
            url: `https://api.darksky.net/forecast/95ab2c8c9f2e65c34124f0786d028a1a/${lat},${lng}`,
        json: true
        }, (error, response, body) => {
        if(!error && response.statusCode === 200){
            let weatherResults = body.currently;
            resolve(weatherResults);
        }
        else{
            reject("Unable to fetch weather");
        }
        
        }); 
    });

}

module.exports = {
    getWeather
};
