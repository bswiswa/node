const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

//create an express app
let app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

//use middleware which never calls next() so that no one can access the site during maintenance
app.use((request, response, next ) => {
   response.render("maintenance", {
      pageTitle: "We'll Be Back Soon!",
       message: "Site is under maintenance and will be back soon!"
   }); 
    //everything ends here because we do not call next()
});

//__dirname is provided by the main wrapper function
app.use(express.static(__dirname + '/public'));




//middleware -- make sure to call next() otherwise it never finishes
app.use((request, response, next) => {
    let now = new Date().toString();
    let log = `${now}: ${request.method} ${request.url}`; 
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err)=>{
        if(err){
            console.log("Unable to append to server.log");
        }
    });
    next();
});

hbs.registerHelper("getYear", () =>{
   return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) =>{
    return text.toUpperCase();
});
//set up a handler for an HTTP request
app.get('/', (request, response)=>{
    //request has information about the request comin in eg headers, body information, method that called the request etc
    //response has methods available for responding to the request eg what data to send back, HTTP status codes etc
    //send body data
  //Express can detect objects, change them to JSON then send them
    response.render("home.hbs", {
        pageTitle: "Node Server",
        welcomeMessage: "Navigate to other pages for more information",
    });

});

app.get("/about", (request, response)=>{
    response.render("about.hbs", {
        pageTitle: "About Page",
    });
});

app.get("/bad", (request, response) => {
    response.send({
      errorMessage: "Error handling request"   
    });
});

app.get("/maintenance", (request, response) => {
   response.render("maintenance.hbs", {
       pageTitle: "We'll Be Back Soon!",
       message: "Site is under maintenance and will be back soon!"
   });
});

app.listen(3000, ()=>{
    console.log("Server is up on port 3000");
});
    
function getYear(){
    return new Date().getFullYear();
}