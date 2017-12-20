//Mongoose configuration and export

let mongoose = require("mongoose");

//Mongoose supports promises or callbacks. We want to use the promises we have been using before not some other third party Promises library.
mongoose.Promise = global.Promise;
//note that the global object is above the process and it encloses it ie global.process === process

//connect to database
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };