const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, database) =>{
    if(err){
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = database.db("TodoApp");
    
    //find one and update
    db.collection("Todos").findOneAndUpdate({ _id: new ObjectID("5a37ef4dda468ca42e7d7810")}, { $set: { completed: true }}, { returnOriginal: false }).then((result)=>{ console.log(`New updated object\n ${JSON.stringify(result.value, undefined, 2)}`)}, (err)=>{console.log("Could not update document", err);});
    
    
//    database.close();
});