function param_required() {
    throw "parameter required!"
}

function uniqueID() {
    return 42; // or whatever your id logic is :P
}

function lazy_demo(id = uniqueID()) {
    console.log(id);
}

function lazy_throw(id = param_required()) {
    console.log(id);
}

/**
 * ^^^ Up until the above, if we ran this script with node, nothing would print to the console.
 * because function calls in the default params field is lazy evaluated. i.e. unless an actual call is made,
 * like the ones below, they would not be executed.
 */

lazy_demo()         // 42
lazy_throw(50)      // 50
// lazy_throw()        // throws error


/**
 * Also, the examples show a function-wise use of the default value setting in JS, like unique id generator or parameter checker.. etc
 */


var x = 10;

// scope of function in param list closes over param list, not global
function left_to_right(x = 2, f = function bar() { return x; }) {
    console.log("left to right evaluation gives: " + x); // should give 2, when no value is passed, and not the global 10

}

left_to_right();        // left to right evaluation gives: 2
left_to_right(50);      // left to right evaluation gives: 50