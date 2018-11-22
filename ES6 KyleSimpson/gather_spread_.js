function array_bar(arr) {
    console.log("array bar o/p : ",arr);
}

function indiv_bar(a, b, c) {
    console.log("indiv bar o/p : ",a, b, c);
}

function foo(...args) {         // gather arguments into an array
    // add 42 to start of array
    args.unshift(42);
    array_bar(args);
    indiv_bar(...args);         // spread array into individual arguments
}

foo(1, 2, 3)

/**
 * Prints:
 * array bar o/p :  [ 42, 1, 2, 3 ]
 * indiv bar o/p :  42 1 2
 */

function foo2(...args) {
    // no need of unshift as '...' spreads it out into params itself. 
	// we are just adding to the head of that list directly
    indiv_bar(100, ...args)
}

foo2(1,2,3)

/* ======= Additional Examples ======= */

// gather 1st of the total arguments into a "def" field, and the rest into the "rest" array
// if this is called without any args, "def" will get default value, and "rest" will be an empty array
function gather_w_def(def = "no args passed", ...rest){ 
    console.log("first value passed: ", def );
    console.log("remaining values: ", rest);
}

var v1 = [1,2,3]
var v2 = [4,5]
var v3 = ["som", ...v1, ...v2, "jit"]  // merge new data with spread-out array elems 

function spreadIt(def="nag"){
    gather_w_def(def, ...v3 );
}

spreadIt();
/*
Prints:
first value passed:  nag
remaining values:  [ 'som', 1, 2, 3, 4, 5, 'jit' ]
*/

gather_w_def();
/*
Prints:
first value passed:  no args passed
remaining values:  []
*/