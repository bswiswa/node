const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, database) =>{
    if(err){
        return console.log("Unable to connect to MongoDB server");
    }
//    const db = database.db("TodoApp");
//    db.collection("Todos").find({ _id: new ObjectID("5a37cc67291fb336089dbd62") }).toArray().then((docs) =>{
//        console.log("Todos");
//        console.log(JSON.stringify(docs, undefined, 2));
//    }, (err)=> { console.log("Unable to fetch todos", err)});
       const db = database.db("TodoApp");
    db.collection("Todos").find().count().then((count) =>{
        console.log(`Count: ${count}`);
    }, (err)=> { console.log("Unable to count todos", err)});
//    database.close();
});