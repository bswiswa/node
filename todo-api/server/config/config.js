//the NODE_ENV is only set on Heroku, not locally
//we need to configure it for our development and test databases
let env = process.env.NODE_ENV || "development";

if(env === "development" || env === "test"){
    //when JSON is required, it is automatically parsed
    let config = require("./config.json");
    let envConfig = config[env];
    Object.keys(envConfig).forEach(key => {
        process.env[key] = envConfig[key];
    });
}

//if(env === "development"){
//    process.env.PORT = 3000;
//    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
//}else if(env === "test"){
//    process.env.PORT = 3000;
//    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest"
//}