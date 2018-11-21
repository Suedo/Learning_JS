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