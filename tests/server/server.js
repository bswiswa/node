const express = require("express");

const app = express();

app.get("/", (request, response) => {
    response.send("Hello world");
//    response.status(404).send({error: "Page not found",
//                              name: "Todo App v1.0"});
});

app.get("/users", (request, response) => {
    response.send(["Batsi", "Ruva", "Shingi", "Baba"]);
});

app.listen(3000, ()=> {
    console.log("Application is running on port 3000");
});

module.exports.app = app;