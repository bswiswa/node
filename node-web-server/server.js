const express = require("express");
const hbs = require("hbs");

//create an express app
let app = express();

app.set("view engine", "hbs");
//__dirname is provided by the main wrapper function
app.use(express.static(__dirname+ '/public'));
//set up a handler for an HTTP request
app.get('/', (request, response)=>{
    //request has information about the request comin in eg headers, body information, method that called the request etc
    //response has methods available for responding to the request eg what data to send back, HTTP status codes etc
    //send body data
  //Express can detect objects, change them to JSON then send them
    response.render("home.hbs", {
        pageTitle: "Node Server",
        welcomeMessage: "Navigate to other pages for more information",
        currentYear: getYear()
    });

});

app.get("/about", (request, response)=>{
    response.render("about.hbs", {
        pageTitle: "About Page",
        currentYear: getYear()
    });
});

app.get("/bad", (request, response) => {
    response.send({
      errorMessage: "Error handling request"   
    });
});

app.listen(3000, ()=>{
    console.log("Server is up on port 3000");
});
    
function getYear(){
    return new Date().getFullYear();
}