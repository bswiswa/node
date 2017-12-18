const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, database) =>{
    if(err){
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = database.db("TodoApp");
    //delete many
//    db.collection("Todos").deleteMany({ text: "Eat lunch"}).then((result)=> { console.log(result)}, (err)=> { console.log("Failed to delete many values")});
    
    //delete one
//    db.collection("Todos").deleteOne({ text: "Eat lunch"}).then((result) => {
//        console.log(result);
//    }, (err) => {
//        console.log("Unable to delete one", err);
//    });
    
    //findOneAndDelete + return deleted value
//    db.collection("Todos").findOneAndDelete({ text: "Eat lunch"}).then((result) => {
//        console.log("deleted one");
//      console.log(JSON.stringify(result.value, undefined, 2));  
//    }, (err) => { console.log("Unable to findOneAndDelete", err); 
//                });
    db.collection("Todos").findOneAndDelete({ _id: new ObjectID("5a37cc67291fb336089dbd62")}).then((result)=>{ console.log(`Deleted: ${JSON.stringify(result.value)}`)}, (err)=> { console.log("Failed to find and delete one document", err)});
    
//    database.close();
});