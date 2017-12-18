const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, database) =>{
    if(err){
        return console.log("Unable to connect to MongoDB server");
    }
//    console.log("Connected to MongoDB server");
//    const db = database.db("TodoApp");
//    db.collection("Todos").insertOne({
//        text: "Learn Node.js",
//        completed: false,
//    }, (err, result) => {
//        if(err){
//            return console.log("Unable to todo document", err);
//        }
//        console.log(JSON.stringify(result.ops, undefined, 2));
//    });
    const db = database.db("TodoApp");
    db.collection("Users").insertOne({
        name: "Batsi",
        age: 30,
        location: "20 Burr St, New Haven, CT"
    }, (err, result) => {
        if(err){
            return console.log("Unable to add user document", err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    database.close();
});