let getUser = (id, callback) =>{
    let user = { id, name: "Batsi"};
    setTimeout(()=>{
      callback(user);   
    }, 3000);  
    console.log("some result");
}

getUser(3, (userObject)=>{
   console.log(userObject); 
});