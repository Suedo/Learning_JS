/*
let is not a complete replacement for var.
let is a helper to var, to ensure block scoping where needed.
Ideally, use both let *and* var.

var : can be used through out the entire function. 
let : can be used only inside a particular scope.

Use var when you want something to be accessible to all sub scopes of a function
Use let when you want to limit the variable to one specific block scope.
*/

// an example of where let may cause problem:
function foo() {
    
    try {
        let z = bar(); // assume bar() throws error
    } catch (error) {
        console.log(z); // nope! z is undefined due to let's block scoping. 
    }
}

/* Also, "let" doesnt allow re-declaration */

