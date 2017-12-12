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
We can shut down the current node process being executed by running the command/function ```javascript    process.exit(0)    ```
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

