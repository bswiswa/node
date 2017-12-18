module.exports.add = (a,b) => a + b;

module.exports.asyncAdd = (a,b, callback) => {
    setTimeout(()=>{
     callback(a+b);   
    }, 1000);
};

module.exports.square = x => x*x;

module.exports.asyncSquare = (x, callback) => {
    setTimeout(()=>{
        callback(x*x);
    }, 1500);
};

module.exports.setName = (user, fullName) => {
    if(typeof fullName === "string"){
    fullName.trim();
    let names = fullName.split(" ");
        if(names.length === 2){
            user.firstName = names[0];
            user.lastName = names[1];
        }
    }
    
};