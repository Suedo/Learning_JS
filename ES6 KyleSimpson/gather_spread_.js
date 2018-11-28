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

/**
 * "..." Gather : works in assignment context, left of the the "=" assignment operator
 * "..." Spread : works in value context, right of "=" assignment operator
 * 
 * when gathering, it will gather the elements into an array. So, if the elements in question is 
 * itself an array, it will create an array of arrays
 * 
 * Example:
 */


function returnMix() {
    return [1, 2, 3, [4, 5, 6]]
}

var a, b, c;

[a, b, c, ...array] = returnMix(); // "array" will be an array, with a single array element of [4,5,6]
console.log(array); // [ [ 4, 5, 6 ] ]
