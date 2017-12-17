const express = require("express");

//create an express app
let app = express();

//set up a handler for an HTTP request
app.get('/', (request, response)=>{
    //request has information about the request comin in eg headers, body information, method that called the request etc
    //response has methods available for responding to the request eg what data to send back, HTTP status codes etc
    //send body data
   response.send("<h1>Hello Express</h1>");
    
});

app.listen(3000);