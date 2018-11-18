/**
 * https://stackoverflow.com/questions/50884288/why-does-node-print-undefined-and-the-browser-doesnt
 * This shows why node.js will give "undefined" for global foo() call, but the same will give "in global" in browser
 */

console.clear();

var a = "in global"

function foo() {
    console.log(this.a)
}

var o2 = {
    a: "in o2",
    foo: foo
}

foo();              // "in global" (only in browser. In node, it will give "undefined")
o2.foo();           // "in o2"


function returnObject() {
    return { myKey: "key value" }
}

console.log(returnObject().myKey);


/**
 * demo of where to ideally use the ES6 "=>" arrow function :
 * Use it when doing "this" based logic, as it binds "this" to the immediate parent scope
 */
var someObj = {
    answer: 42,
    foo: function someTimeout() {
        setTimeout(function bar() {
            // timeout executes wrt global scope. 
            // prints: "a billion years later: undefined"
            console.log("a billion years later: " + this.answer);
        }, 100)
    }
}

someObj.foo();

var someObj_arrow = {
    answer: 42,
    foo: function someTimeout() {
        // the "=>" arrow binds "this" to the immediate parent scope of someObj
        // prints: "a billion years later: 42"
        setTimeout(
            x => console.log("a billion years later: " + this.answer)
        , 200)
    }
}

someObj_arrow.foo();