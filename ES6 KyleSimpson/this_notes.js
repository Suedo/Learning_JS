/**
 * Visual hickups in using "=>" arrow function instead of standard "function" keyword
 */

//  variations :
(...x) => 3;
(x, y) => 3;

/**
 * these concise arrow functions are expressions, and not statements, 
 * so we cannot use statements with them
 * thus, no if,else,try-catch etc etc.
 */

// x => try {3;} catch (err) {}  // invalid because try-catch is a stament
x => { try { 3; } catch (err) { } }   // valid, enclosing {} is required
x => { return 3; }               // {} also needed here. as return is a statement
/*
    A complex hiccup: when we want to return an object:
    the default {} used above here will form part of the object itself, so we have to 
    remember to enclose it inside ()-s
*/
x => ({ objKey: "objVal" })       // {} here isn't gonna make a statement, need to enclose inside ()


/*
Also, "=>" functions are anonymous, making a lot of cases complicated like self-referencing and debugging
*/


/*
--------------------------------------------------------------------------------
SO, WHEN DO WE USE "=>" ARROWS?
--------------------------------------------------------------------------------
    When we have a lot of "this" based logic, as the "=>" arrow will bind this to the immediate parent scope.
    
    The "=>" arrow lexically binds "this" to the immediate parent scope of someObj.
    This is different than a normal function call, where "this" depends on the runtime call site (global, in case of setTimeout)
*/

var someObj = {
    answer: 42,
    foo: function someTimeout() {
        setTimeout(function bar() {
            // a billion years later: undefined
            console.log("a billion years later: " + this.answer);
        }, 1000)
    }
}

var someObj = {
    answer: 42,
    foo: function someTimeout() {
        // a billion years later: 42
        setTimeout(x => console.log("a billion years later: " + this.answer), 1000)
    }
}

someObj.foo();