const express = require("express");

//create an express app
let app = express();
//__dirname is provided by the main wrapper function
app.use(express.static(__dirname+ '/public'));
//set up a handler for an HTTP request
app.get('/', (request, response)=>{
    //request has information about the request comin in eg headers, body information, method that called the request etc
    //response has methods available for responding to the request eg what data to send back, HTTP status codes etc
    //send body data
  //Express can detect objects, change them to JSON then send them
    response.send("<h1>Hello Express</h1>");

});

app.get("/about", (request, response)=>{
    response.send("<h1>About</h1>");
});

app.get("/bad", (request, response) => {
    response.send({
      errorMessage: "Error handling request"   
    });
});

app.listen(3000, ()=>{
    console.log("Server is up on port 3000");
});