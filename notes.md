# Node
Node.js is a JavaScript runtime environment that operates on the V8 (C++-based) engine.

Came about when JavaScript was taken out of the browser and let to run on local machines. Now we could create applications outside of the context of the browser.

Node gives JavaScript a feature set similar to other languages like Java, Python or PHP.
Thus you can write applications using the JavaScript syntax that manipulate file systems, query databases and create web servers. These are all things that are possible because of Node.

Node and JavaScript both run on the V8 JavaScript runtime engine which is an open source software that compiles JavaScript into machine code.

Run the `node` command to begin a node process. A node process will allow you to run JavaScript in a console environment. The JavaScript you write will be executed by the V8 engine in the background.

## Execution context
When JavaScript runs in the browser, the global execution context where everything is contained is the **window** object.
In Node, we are independent of the browser so the global execution context is different. The global object in this case is not **window** but **global**.

Inside of the browser, you have access to the **document** object, which refers to the DOM. The DOM contains nodes corresponding to every item displayed in the browser.
Making changes to the **document** object is the way of manipulating the displayed content in the DOM and ultimately the browser.

Inside of node, we do not have this HTML document but what we have that is similar is called a **process**. You can view it by running the command `process` from inside of node and it gives you a lot of information about the specific node process being executed.

We can shut down the current node process being executed by running the command/function 
```javascript
process.exit(0)    
```
Here 0 is to specify that everything ran fine without an error. It is a common specification between languages.
`process.exit(0)` returns us to our usual terminal. We can also do CTRL-C twice to exit from the node process.

## Non-blocking IO
Node.js is single-threaded but it is still very fast because it is non-blocking meaning that other operations still continue even whilst others are waiting for a result.

## Package ecosystem - npm
**npm** is the largest library of open source software in the world. The availability of packages allows developers to focus more on their particular application's logic rather than on the infrastructure around it.

If you are trying to solve a generic problem, chances are that someone has already provided a package for it so always check npmjs.com first.

## Node fundamentals
### Modules
A module is a unit of functionality. 
We can harness the functionality of modules in our code by using the **require** function. 

**require** enables us to load in modules. This allows us to take existing functionality provided by Node developers, third party libraries or ourselves and load it into our file and develop products faster.

### Using our own module
Inside of all our node files, we have access to a variable called **module**. The **module** property has an object called **exports**. Everything inside of **module.exports** gets exported. This includes methods, variables etc.

When we run the code:
```javascript
 const pdf = require("pdfMake");
```
...it means that the `pdf` object is set to the exports object of the `pdfMake` module.

We export functions and variables in our module by attaching them to the module.exports object as shown:
```javascript
//exporting a variable
module.exports.age = 30;

//exporting a function
module.exports.add = (a, b)=>{
    console.log(`adding ${a} and ${b}`);
    return a+b;
};
```
### Using third-party modules
1. Initialize npm inside your project by running `npm init`
2. Answer some questions including
    - application name
    - version
    - description (optional)
    - entry point of application eg app.js
    - test command (optional)
    - git repository (optional)
    - keywords - useful for when people are searching for your module. If you are not publishing this is not required
    - author
    - license(can be left as ISC, since we are not publishing)
    
All in all, the command `npm init` is not doing anything special behind the scenes. It is creating a single file in the root of your project called **package.json**.
This file will contain meta information about your project and also specifies all its dependencies.

3. Find the package name on npmjs.com

4. `npm install package_name --save`
Here a folder called **node_modules** is created and inside of it, the package and all its code will be there.
If we include the `--save` flage, the **package.json** file is also updated to include the name and version of the installed package. This is in the **dependencies** property.

5. require the module and use it

lodash is an example of a package packed with utility functions that you do not need to rewrite.
### Sharing your code
When uploading code to github be sure to exclude the **node_modules** folder. You can do this by adding a line in your **.gitignore** file:
```
node_modules/
```
If you have multiple subdirectories with their own node_modules/ folders, you still only have to include the above line in the .gitignore file in the application root folder.

Also do not make any changes to the code inside the modules themselves because this will get overwritten anyway anytime you update your dependencies or install any new modules that depend on them.

When distributing your code you do not have to include the **node_modules** folder because, whenever we install a package, our **package.json** file contains information about the package name and it version. 

If you get code without the **node_modules** folder, you can run the command `npm install` and it will install all the packages and their dependencies with their correct versions to your project. 

This is assuming that the **package.json** file is specifies all packages needed (non of them were installed without using the `--save` flag. If a package is installed without using the `--save` flag, it is installed but the package.json file is not updated and so someone running `npm install` to get all packages in your package.json file will be missing that one)

### Order of loading
It is also important to know the order of operations when packages are being included in your project -- your project is first searched for a package and if it is not found there, it is then installed.

### nodemon
If you do not want to keep rerunning the `node app.js` command to restart the application, you can do a global install of the **nodemon** package from npm.
```
npm install nodemon -g
```
Once installed you can run your application as you would with the `node app.js` command but this time instead of using `node` you use `nodemon` as in `nodemon app.js`.
Once you are set up this way, anytime you make an update to your application and save it, it will be refreshed and rerun so you can see the results of your changes immedeately.
Note that nodemon is only used for development processes. When you deploy to a real web server, you do not need nodemon.

### User input
We can run node apps and specify additional inputs on the command line. These additional arguments can be found on the process's argv (argument vector) property:
```
node app.js myArgument
```
Inside of the app we can access the "myArgument" argument by as follows:
```
console.log(process.argv[2]);
//myArgument
```
Notice that we our command line argument is the third value in the argv array. The first two values correspond to the node executable that was run and the entry point used to run the process.

You can install the **yargs** package to help with parsing  command line input.
```javascript
const argv = yargs.argv;
console.log(argv);
//{ _: [ 'remove' ], title: 'batsi', '$0': 'app.js' }
```
The _ property above is where commands will be stored eg "add", "remove".
yargs is most useful when we need to pass in key-value pairs as it is able to parse the strings and organize them appropriately for you. Using yargs also frees us from having to hardcode the index of the command line variables in the process.argv array.
```
node app.js remove --title="batsi"
yargs.argv { _: [ 'remove' ], title: 'batsi', '$0': 'app.js' }
```
Notice that yargs was able to parse the `--title = "batsi` and store them appropriately. 

### Working with JSON
JSON stands for JavaScript Object Notation and it is a way of representing an object as a string. JSON is popular because it is a string of text and so it can be easily read or parsed and used to recreate an object.
#### Creating JSON
You can create a JSON representation of a value by using the **JSON.stringify()** function.
```javascript
var obj = {
    name: "Batsi"
};

var str = JSON.stringify(obj);
//value stored in str is a string and no longer an object

console.log(typeof str); //string

console.log(str); //{"name":"Batsi"}
```
Thus JSON.stringify() returns a JSON string. This string looks similar to the object but with some key differences:
1. JSON attribute names are wrapped in double quotes - hence `name:` is now `"name":`. This is a universal requirement for JSON syntax
2. strings will be wrapped in double quotes as opposed to single quotes. Numbers will stay the same eg
```
{"name":"Batsi", "age": 30 }
```
#### Reading values and objects from JSON
Use **JSON.parse()** to get back an object from JSON
```javascript
// manually create JSON
let personString = '{ "name": "Batsi", "age": 25}';
// use JSON.parse() to get an object back from JSON
let person = JSON.parse(personString); //

console.log(typeof person); // object
console.log(person);        // { name: 'Batsi', age: 25 }
```
We can see that person is an object from the return of the typeof operator but also because of the way the object looks internally - notice how the keys are no longer wrapped in double quotes, like `"name":` as before and also that the values are wrapped in single quotes like `'Batsi'`. Single quotes on strings is valid in JavaScript but not valid in JSON.

#### Writing JSON to a file and reading back
We can write JSON to a file which has to have the **.json** extension
```javascript
//require file system module
const fs = require("fs");

//create our object
let originalNote = {
    title: "Some title",
    body: "some body"
};

//JSONify
let originalNoteString = JSON.stringify(originalNote);
//write to file. Note that file has to have .json extension
fs.writeFileSync("notes.json", originalNoteString);

//read object from file and print a property to verify
let noteString = fs.readFileSync("notes.json");
let note = JSON.parse(noteString);

console.log(`title: ${note.title}, body: ${note.body}`);
// title: Some title, body: some body
```
Note that the created file **notes.json**'s contents will look like this:
```
{"title":"Some title","body":"some body"}
```

## Node debugging
### Command line debugging
Use the **inspect** command for example, to debug *app.js*
```
node inspect app.js
```
This attaches the debugger to our application.

When debugging we may want to go through the application line-by-line to figure out what is going on. So when you run debug mode, initially, the app will not have started at all.
Instead the debugger will be paused on the first line.
You can run the **list()** function which can take in a positive integer **n** and it will list the **n** lines above and below the place we are paused eg `list(10)`

When you run the **list()** command at the top of our code with an integer specified, we will see our code wrapped inside a function:
```javascript
((function (exports, require, module, __filename, __dirname){
...
...our code..
...

});
```
This wrapper function is created by Node.js and all code we write is wrapped in it. 
This function gives us access to **require, module, exports, __filename, __dirname**. For example, when we add things to module.export, module is defined here.

To execute the next statement, we use the `n` (next) command.

When we reach the end of the lines we can run the `c` (continue) command and all our lines will get excecuted until the program completes.

You can shut down the debugger by entering `exit` or pressing CTRL-C twice.

`n` and `c` are basic debugger commands. We can also stop and check on the values of variables at different points of execution.
If you shutdown and restart the debugger.
We can navigate through the lines with `n` and when we get to a place where we would like to see the values of items, we can use the `repl` command. `repl` stands for read-evaluate-print-loop. This is a place where we can manipulate values or just see them.
The `repl` will put us in a different mode
```
debug> repl
Press Ctrl + C to leave debug repl
\>
```
In **repl** we can access any of our values and print them out.

```
\> person
{ name: 'Batsi', age: 30 }
\> person.age + 10
40
\> person.age
30
\> person.age += 10
40
\> person.age
40
```
As shown above, when in **repl** we can even manipulate the data and change it with any JavaScript statement.
You can exit **repl** and return to debug mode by pressing CTRL-C.

If we do not want our debugger to scroll through each line one by one with `n`, we can use the `debugger` statement in our code. 
The first break point in our code will be the first line but where the code goes next with `c` will be determined by the presence or absence of `debugger` statements.
If none are present, then `c` will proceed to execute the entire program.
If one or more are present, then `c` will execute and stop at the next `debugger` statements.

```javascript
let person = { name: "Batsi"};

person.age = 30;

debugger;

person.name = "Shingi";

console.log(person);
```
We can navigate to multiple `debugger` statements in our code with the `c` command. This is the usual way of debugging as it is faster than moving through each line with `n`.

### debugger with nodemon
Note that you can also run the debugger with **nodemon**.
Instead of running:
```
node inspect app.js
```
You can run
```
nodemon inspect app.js
```
This open debug mode as usual, but also run **nodemon**. If we make changes to our application, **nodemon** will rerun and refresh the app as well as the debug console. Thus we avoid having to rerun the debugger each time we make a change.
### Debugging with Chrome DevTools
`node inspect` allowed us to inspect via the command line but when we want to inspect via the Chrome DevTools, we use `node` with a flag
```
node --inspect-brk app.js
```
This tells Node that we want to run app.js in **inspect** mode but we do not want to connect via the command line. We also want to break, just before the first line as usual.

Next we open the Chrome browser and go to the url - **chrome://inspect**

Click on **Open dedicated DevTools for Node**

Here we will be on the **Sources** tab which will show a similar output to what we had in the console. In fact, we can toggle the console in the Developer Tools as well by hitting Esc.

In DevTools we can navigate to the next breakpoint by clicking on the forward arrow. We can perform our variable inspections in the console.

If we would like to add more break points, we can simply click on the line number for that.

Note that we can also use nodemon with DevTools. This will refresh DevTools whenever we update our code.
In order to run DevTools with nodemon we run the following command
```
nodemon --inspect-brk app.js
```
Which is again just a swap of node with nodemon

Chrome DevTools is useful when you have browser access but if you are on a server, then the command-line debugger is your only way of debugging so it is good to know both.

## Arrow Functions vs Regular functions
Arrow functions cannot be used everywhere that regular functions (ES5 type) are used. There are some special properties of arrow functions which make this so:

1. arrow functions do not bind the local **this** object 

```javascript
let user = {
    name: "Batsi",
    sayHiOne: function(){
        console.log(`Hi, I'm ${this.name});
    },
    sayHiTwo: () => {
        console.log(`Hi, I'm ${this.name}`);
    }
};

user.sayHiOne(); // Hi, I'm Batsi
user.sayHiTwo(); // Hi, I'm undefined
```
Notice that sayHiOne() and sayHiTwo() are only different in that sayHiOne() uses a regular function expression whereas sayHiTwo() is an arrow function. 
The output of the two functions shows how the arrow function is not aware of the local **this** reference and thus returns **undefined**.

ES6 allows has an alternative way of defining object methods and making sure that the **this** reference is maintained. This is by defining object methods as follows:

```javascript
let user = {
    name: "Batsi",
    sayHi(){
        console.log(`Hi, I'm ${this.name});
        }
};

user.sayHi(); // Hi, I'm Batsi
```
Notice that this way of defining methods skips the `:` and an arrow.

Regular functions also have access to the **arguments** array (more of an object with array-like properties). This arguments object is specified in a regular function eg
```javascript
let user = {
    name: "Batsi",
    sayHi(){
        console.log(arguments)
        console.log(`Hi, I'm ${this.name});
        }
};

user.sayHi(1,2); 
// { '0': 1, '1': 2 }   <-- arguments
// Hi, I'm Batsi
```
...in arrow functions, we get the global arguments object and not the arguments for that function.
So be aware that arrow functions do not bind the **arguments** or **this** keyword.

## Asynchronous Node.js
An asynchronous program continues to run even whilst waiting on some of its subprocesses to complete.

```javascript
console.log("Starting app");

console.log("Finishing up");
```
These two will always run synchronously.
In order to demonstrate some basic asynchronous functionality we can use the **setTimeout()** function. This function takes 2 arguments - the first being a function that is going to get called after a specified amount of time. The second parameter is the number of milliseconds you want to wait before firing the function.
```javascript
console.log("Starting app");

setTimeout(() => console.log("Inside of callback"), 2000);

console.log("Finishing up");
```
The output of running this file eg `node app.js` initially looks like this:
```
Starting app
Finishing up
```
...then about 2 seconds later:
```
Starting app
Finishing up
Inside of callback
```
This is not the order we wrote the code but this is the order in which it executes.
By using non-blocking I/O we are able to wait two seconds for one process but in the mean time we are not blocking the rest of the program from executing.

What is the output of this code below where we have a process with zero timeout before `console.log("Finishing up")`?
```javascript
console.log("Starting app");

setTimeout(() => console.log("Inside of callback"), 2000);

setTimeout(() => console.log("Zero timeout"), 0);

console.log("Finishing up");
```

The output is:
```
Starting app
Finishing up
Zero timeout
Inside of callback
```
The second **setTimeout()** surprisingly executes after the last line. Why does our function with zero time out not execute immediately?

### Behind the scenes
<!--
--------------                 ------------------------
| Call Stack |    ------->>    |     Node APIs        |
--------------                  -----------------------
        |^                                |
Event   ||                                |
Loop    v|                                v
    
------------------------------------------------------
|              Callback Queue                        |
------------------------------------------------------
-->

#### Call Stack
The call stack is a data structure that keeps track of program execution inside of V8. 
It keeps track of functions currently executing and the statements that have fired.
It is a data structure that can do 2 things:
1. You can add something on the top of it
2. You can remove the top item. You have to remove the top item first before you can remove any other item inside it.

When we begin executing our program, node runs the **main()** function. This **main()** function is the wrapper function that encloses all of our code when we run it with Node.js. 
#### Explaining our code
How are Call Stack, Node APIs, Callback Queue and Event loop involved in the execution of our code below?
```javascript
console.log("Starting app");

setTimeout(() => console.log("Inside of callback"), 2000);

setTimeout(() => console.log("Zero timeout"), 0);

console.log("Finishing up");
```
- `main()` function is pushed into call stack and begins execution. It remains at the bottom of the stack whilst its statements execute
- `console.log("Starting app");` is pushed into the call stack and executes, printing "Starting app" to the screen. It is popped off the stack after execution
- setTimeout() is a Node API. It is not available inside of the V8 engine but rather it is something that Node gives us access to. 
The first setTimeout is pushed onto the call stack
When we call setTimeout() we register an event-callback. The event is the instruction to wait 2 seconds and the callback is the anonymous arrow function `() => console.log("Inside of callback")`
When we call setTimeout, it gets registered in the Node APIs and starts execution of waiting 2 seconds. In the meantime, the setTimeout call is removed from the call stack. The call stack can only process on function at a time but we can have events waiting to get processed even when the call stack is executing.
- the next statement that runs is the second setTimeout call. Here we register the setTimeout in the Node APIs section again where the previous setTimeout call currently resides, counting down its 2 seconds to execution. However, this second setTimeout call is registered with a 0 second timeout.
Once registered in the Node APIs, this second setTimeout is popped off the call stack.
- because the second setTimeout has a zero timeout, it finishes on the Node APIs but it doesn't get executed instantaneously. Rather, it is added into the back of the Callback Queue. This callback queue consists of all the callback functions that are ready to get fired.
All functions in the callback queue wait for the call stack to be empty first before they can run. 
When the call stack is empty, we can run the first function in the callback queue. If there is another function in the callback queue behind it, it will have to wait for that first function to finish executing first.
- This is where the Event Loop comes in. The event loop takes a look at the call stack. If the call stack is not empty, the event loop does nothing since the call stack can only run one thing at a time. 
In our example, main() is still executing on the call stack and so the event loop does nothing.
- In the mean time, `console.log("Finishing up")` gets pushed onto the call stack and executed, printing "Finishing up" to the screen. It gets popped off the stack after finishing. 
- The **main()** function then gets popped off the call stack and at this point the call stack is empty, and this state is detected by the event loop. The event loop checks if there is something in the callback queue and if so, it moves the first callback into the call stack and executing it.
The first function that will run is the callback of the zero timeout setTimeout function since it is the first callback function in the callback queue. `() => console.log("Zero timeout")` will get executed in the call stack, printing "Zero timeout" to the console. 
So in summary, `() => console.log("Zero timeout")` executes after `console.log("Finishing up")` because it is a callback function and has to wait until the main function completes execution and is removed from the call stack whereas the latter is a part of the main program and always executes before it.
- After the callback finishes executing, it is popped off the stack and at this point there is nothing in the call stack and nothing in the callback queue BUT there is still something registered in the Node API and so the Node process is not finished yet.
- 2 seconds later, the original setTimeout will fire and move its call back function into the callback queue. The event loop will check the call stack and see that it is empty then it will check the callback queue and see that there is something to run. So it will push the callback onto the call stack and start the process of executing it. Thus the `() => console.log("Inside of callback")` callback function is executed.


### Callback function
Is a function that is passed as an argument to another function and is executed after a certain event has happened. For example:
```javascript
setTimeout(() => console.log("Inside of callback"), 2000);
```
Here the event is the passing of 2 seconds and it triggers the firing of the callback function.
The event could be anything like a database query finishing or an HTTP request coming back. In these cases, you will want a callback function to do something with that data.

### Pretty printing
The console does not print out nested objects well. Here is an object returned from a Google Geolocation API call and printed to the console:
```
{ results:
   [ { address_components: [Array],
       formatted_address: '4 Burr St, New Haven, CT 06512, USA',
       geometry: [Object],
       place_id: 'ChIJned6mw3Z54kRVQysVU3IVsI',
       types: [Array] } ],
  status: 'OK' }
  ```
Here we cannnot see the contents of the array value of `results.address_component` and `results.types` or the object value of `results["geometry"]`.
In order to always get a full printout of objects and always be able to see nested fields, you can use the `JSON.stringify()` function

JSON.stringify takes in the 
1. object to be printed, 
2. an object specifying the fields you want to filter (usually left as `undefined`), 
3. lastly an integer specifying the number of spaces for indentation

### HTTP Requests
HTTP stands for the HyperText Transfer Protocol. In HTTP we make a request from a website, and the data that comes back is called the body of the request. 

An HTTP request consists of an options object and a callback. 
The options object specifies the url we are querying and has other information like the format we would like the data to be returned in. 
The callback function handles the result of the request and takes 3 arguments - *error, response* and *body*

An example request is shown below:

```javascript
//request(optionsObject, callback)
request({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=4%20Burr%20Street%20New%20Haven%20CT",
    json: true
}, (error, response, body)=>{
    console.log(JSON.stringify(body, undefined, 2));
});
```
The body of an HTTP request comes in many forms:
Everytime you make a url request on the internet, the page that you have returned and rendered is the body of the request. In this case the body of the request is HTML.
The body can also be JSON which is the case in a Google Geolocation API request.
In summary, the body is the core data that comes back from the server.

The **response** of an HTTP requests is an object that has information about the request success. It has a field called **statusCode** which tells how the request went.
200 means OK
404 means Page not Found
500 means Server crashed
additional **statusCode** values depend upon the implementation. 
The **body** is also included in the **response** object (**response.body**) even though you can access **body** on its own.
Below the **body** field of **response** there is a **headers** field which is part of the HTTP protocol and consist of key-value pairs. They can be sent in both the request and the response. Examples of headers are:

```
"headers": {
    "content-type": "application/json; charset=UTF-8",
    "date": "Fri, 15 Dec 2017 17:43:43 GMT",
    "expires": "Sat, 16 Dec 2017 17:43:43 GMT",
    "cache-control": "public, max-age=86400",
    "access-control-allow-origin": "*",
    "server": "mafe",
    "x-xss-protection": "1; mode=block",
    "x-frame-options": "SAMEORIGIN",
    "alt-svc": "hq=\":443\"; ma=2592000; quic=51303431; quic=51303339; quic=51303338; quic=51303337; quic=51303335,quic=\":443\"; ma=2592000; v=\"41,39,38,37,35\"",
    "accept-ranges": "none",
    "vary": "Accept-Language,Accept-Encoding",
    "connection": "close"
  }
```
When you create your own API, you will need to be familiar with how the headers work.
After the **headers** we have the **request** object which has information about the request that was made

```
  "request": {
    "uri": {
      "protocol": "https:",
      "slashes": true,
      "auth": null,
      "host": "maps.googleapis.com",
      "port": 443,
      "hostname": "maps.googleapis.com",
      "hash": null,
      "search": "?address=4%20Burr%20Street%20New%20Haven%20CT",
      "query": "address=4%20Burr%20Street%20New%20Haven%20CT",
      "pathname": "/maps/api/geocode/json",
      "path": "/maps/api/geocode/json?address=4%20Burr%20Street%20New%20Haven%20CT",
      "href": "https://maps.googleapis.com/maps/api/geocode/json?address=4%20Burr%20Street%20New%20Haven%20CT"
    }
```
eg protocol used, host, query

After **request**, we also have our own custom **headers** eg

```
"headers": {
      "accept": "application/json"
    }
```
This was set when we in the creation of the request itself:

```javascript
request({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=4%20Burr%20Street%20New%20Haven%20CT",
    json: true
}, (error, response, body)=>{
    console.log(JSON.stringify(response, undefined, 2));
});
```
...right at the line `json: true` which specified that we wanted our body to be returned as an object parsed from JSON.
So in summary the **response** object stores information about the response and the request itself.
### Errors on the HTTP request object
The **statusCode** is very important for determining whether we should proceed with our code and it will be checked on whenever we are working with HTTP requests.
If there are errors, the **statusCode** only detects that an error occurred on the server-side eg (crashing servers- 500, non-existent data - 404).
There are also errors that can happen during the process of making the HTTP request, before it is even sent out eg spelling error on the domain or non-existent domain. In this case, there will be an error in the request object as we cannot even connect to a server. An error during the making of the request could happen if we do not have internet access. 
An error due to a mispelt server (thus non-existent) could look like this:

```
{
  "code": "ENOTFOUND",
  "errno": "ENOTFOUND",
  "syscall": "getaddrinfo",
  "hostname": "maps.gmoogleapis.com",
  "host": "maps.gmoogleapis.com",
  "port": 443
}
```
The most important field here is the **code**

If we make a successful call to a server the **statusCode** of the response is 200 and the **error** is `null`

### Using yargs with no command
When you have a command-line interface application that has only one function, there is no need for it to have commands, it just need to run with the provided parameters or options. For example if we create an app that returns the longitude of an address, the only option we need provided is that address. The application need not have a command like `longitude` or `getLongitude`

In such a case we can specify only the options for yargs. Each option can specify whether it is demanded(always required, except for **help**), what its other aliases are, description, variable type eg string.
If we want to add a **--help** flag we also run the help() method on yargs.

```javascript
const argv = yargs
                .options({
                    a: { 
                        demand: true,
                        alias: "address",
                        describe: "Address to fetch longitude for",
                        string: true
                    }
                })
                .help()
                .alias("help", "h")
                .argv;

```
This code will require a **-a** or **--adress** flag when it runs which is always read as a string.

### URI Encoding and Decoding
To generate a URI, we must encode special characters eg commas (%2C%), spaces (%20%) etc. 
A useful function for doing such encoding is **encodeURIComponent**
A function for decoding a URI back to a regular string is **decodeURIComponent**
Both take a string and return a string.
```javascript
let encodedAddress = encodeURIComponent("1301 New Haven, PA");
console.log(encodedAddress); //1301%20New%20Haven%2C%20PA
let address = decodeURIComponent(encodedAddress);
console.log(address);  //1301 New Haven, PA
```
