const { User } = require("./../models/user");

//middleware function we use on our routes to make them private. middleware functions have 3 arguments request, response, next
//actual route is not going to run until next() gets called inside of the middleware
let authenticate = (request, response, next) => {
    let token = request.header("x-auth");
    User.findByToken(token).then(user => {
        if(!user){
            return Promise.reject();
        }
        request.user = user;
        request.token = token;
        //very important that we call next after middleware has finished. Only call it if we were successful.
        next();
    }).catch(e => {
        response.status(401).send();
    });
};

module.exports = { authenticate };