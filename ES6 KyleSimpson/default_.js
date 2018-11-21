function foo(x) {
    x = x || 42; // manually assigns a default value of 42 if no value passed in
    // x = x !== (undefined || null) ? x : 42; // long form of the above
    console.log(x);
}

/**
 * @param {*} x assigns default value of 42 to x, if no/undefined values passed in. "null" will reflect as null in o/p.
 */
function foo_def(x = 42) {
    console.log(x);
}

// Basic cases:
// foo();             // 42
// foo(undefined);    // 42
// foo(20);           // 20
// foo_def();         // 42
// foo_def(50);       // 50

foo(null);      // 42
foo_def(null);  // null


// foo_def gives same o/p
foo([]);        // []
foo([,]);       // [ <1 empty item> ]

