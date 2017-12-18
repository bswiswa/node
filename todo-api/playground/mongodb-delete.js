const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, database) =>{
    if(err){
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = database.db("TodoApp");
    //delete many
    db.collection("Todos").deleteMany({ text: "Eat lunch"}).then((result)=> { console.log(result)}, (err)=> { console.log("Failed to delete many values")});
    //delete one
    
    //findOneAndDelete + return deleted value
    
//    database.close();
});