let asyncAdd = (a,b) =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(typeof a === "number" && typeof b === "number"){
                resolve(a+b);
            }else{
                reject("Arguments must be numbers");
            }
        }, 1500)
    });
};
asyncAdd(5,"10").then((sum)=> {
    console.log(`Sum = ${sum}`);
    return asyncAdd(sum, 10);   
    })
    .then((result)=> console.log(`Result is ${result}`))
    .catch((errorMessage) => console.log(errorMessage));

//let somePromise = new Promise((resolve, reject) => {
//    setTimeout(()=> {
//        resolve("It worked!");
//        reject("Unable to fulfill promise");
//    }, 2500);
//    
//});
//
//somePromise.then((message)=>{
//    console.log("Success", message);
//}, (errorMessage) => {
//    console.log("Error", errorMessage);
//});