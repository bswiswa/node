const users = [
    {
        id: 1,
        name: "Batsi",
        schoolId: 101
    },
     {
        id: 2,
        name: "Ruva",
        schoolId: 999
    }
];

const grades = [
    
    { id: 1, schoolId: 101, grade: 75},
    { id: 2, schoolId: 999, grade: 90},
    { id: 3, schoolId: 101, grade: 88}
];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === id);
        
        if(user){
            resolve(user);
        }else{
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};

const getGrades = (id) => {
    return new Promise((resolve, reject) => {
       resolve(grades.filter(grade =>
           grade.schoolId === id));   
    });
};

const getStatus = (userId) => {
    let user;
    return getUser(userId).then(tempUser => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then(grades =>{
        let average = 0;
        if(grades.length > 0){
            average = grades.map(grade => grade.grade).reduce((a,b) => a + b) / grades.length;
        }
        console.log(average);
         return `${user.name} has a ${average}% in the class.`;
        //return our string
    });
};
/*
in async functions we always get a promise back, returning something is the same as resolving it. Throwing an error is equivalent to rejecting.

There is no top-level await. await has to be used inside of an async function
*/
const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    let average = 0;
    
    if(grades.length > 0){
        average = grades.map(grade => grade.grade).reduce((a,b) => a + b) / grades.length;
        }
    return `${user.name} has a ${average}% in the class.`;
};
getStatusAlt(1).then(status => console.log(status)).catch(e => console.log(e));


//console.log(getStatusAlt(1));
//console.log(getStatusAlt(1).then(name => console.log(name)).catch(e => console.log("error", e)));
//getUser(1).then((user) => console.log(user) )
//            .catch(e => console.log(e));
//
//getGrades(101).then(grades => console.log("grades", grades)).catch(e => console.log(e));
//
//getStatus(2).then(status => console.log(status)).catch(e => console.log(e));