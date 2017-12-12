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

