/*
  Here we deal with various Async patterns in JS:

    1. Callbacks
    2. Generators/Coroutines
    3. Promises

*/

--------------------------------------------------------------------------------

/* Nesting of callbacks:
    The `pyramid of doom` is most often advertised as an indendation problem. However, the same can exist even without indendation.
    Below, we start with the pyramid of doom version, and then with a non-pyramid version that looks better, but has the exact same problem.

*/

// Pyramid of doom
setTimeout( function() {
  console.log("one");
  setTimeout( function() {
    console.log("two");
    setTimeout( function() {
      console.log("three");
    }, 1000 );
  }, 1000 );
}, 1000 );


// Continuation Passing
function one(cb) {
  console.log("one");
  setTimeout(cb,1000);
}
function two(cb) {
  console.log("two");
  setTimeout(cb,1000);
}
function one(cb) {
  console.log("three");
}
one(function(){
  two(three); // this has the same effect of the nested calls in pyramid of doom version
})


// ^^ even though the Continuation Passing method looks good, it has the same problem: Inversion of control
//    where we hand over control of execution to the stuff being called, and hope and trust that they will not do anything fishy while they have control

--------------------------------------------------------------------------------

/*
  Below we some BAD attempts at solving some of the callback problems:
    1. Separate Callbacks
    2. One callback, with first argument as an error (error-first style, aka node(.js) style)
*/

// 1. Separate Callbacks: do `err` stuff if error occurs, else do `valid` stuff
trySomething(
  function(num){ console.log("success: " + num ); },  // Do this if for `valid` case
  function(num){ console.log("Sorry: " + num ); }     // Do this for `err` case
); // execution

function trySomething(valid, err){ // definition
  setTimeout(function(){
    var num = Math.random();
    if (num > 0.5 ) valid(num); // the `valid` callback is executed
    else err(num);              // the `err` is executed
  },1000 );
}

// ^^ here also we are placing a trust that it will either execute the `valid` OR the `err` callbacks. What if it executes both callbacks? That would probably lead to a failure


// 2. Error first style(aka node style): we pass in a single callback, which has two arguments, with `err` case being the first one
//    if valid execution occurs, callback will be be called with a `null` for the first argument ( i.e. for error), indicating no error case
trySomething(function(err, num) {
  if (err) console.log(err); // does `err` have a truthy value ? then log the error
  else console.log("Success! Number is : " + num ); // `null` is falsy, err is passed `null` to indicate no errors
}); // execution

function trySomething(cb){ // definition, `cb` is our callback
  setTimeout(function(){
    var num = Math.random();
    if (num > 0.5 ) cb(null,num);   // `valid` case, `err` is null
    else cb("Too Low!");            // a truthy value in first argument, which serves as error, thus indication an error occured
  },1000 );
}

// ^^ Here again, what if through a bug or whatever, whatif they invoke trySomething() with both an error object as well as a success value?
//  like : trySomething("true","true") ... how do you handle such unexpected behavior ?

--------------------------------------------------------------------------------

/*    Generators and Promises to the rescue     */

--------------------------------------------------------------------------------

/*    Generators    */

function coroutine(g){
  var it = g();
  return function(){
    return it.next.apply(it,arguments);
  };
}


var run - coroutine(function* (){
  var x = 1 + (yield null);       // y1: first halt after r1. r2 triggers it again, and gets 10 from r2
  var y = 1 + (yield null);       // y2: halt here after r2. r3 triggers it again, with value 30
  (yield x + y);                  // y3: halt here after r3. (x+y) is evaluated, and r3 obtains it through `.value`
});

run();      // r1: stops at y1, gets back null.
run(10);    // r2: send 10 to y1, stops at y2, gets back null. x is now 11
// run(30): r3: sends 30 to y2, stops at y3. x was 11, y is now 31, y3 yield is evaluated to 42, gets that `value`
console.log("Meaning of life: " + run(30).value); // "Meaning of life: 42"

/*
^^ So how does the above pattern help ?
    each of the run() calls, which are basically, through the coroutine wrapper,
    calls to the generator's `next()` function, which moves the function one step ahead.
    And these can be called asynchronously, at various different times, halting
    each step of the way, processing the data obtained at each step, and waiting
    for the conditions for calling the next step, which can happen a minute from now,
    or maybe after 5 years!

    This is a complete departure from the earlier continuos execution mode, where
    once a function is started, it will run till it completes. In this generator
    model, a function does not even need to complete, all we need is a value from a
    particular step/yield and never call it again. That's completely okay.

    Thus is solves the inversion of control problem, by bringing back the control
    to us: we now decide what to do next, based on what happened at a particular
    yield point

*/

--------------------------------------------------------------------------------

/*    Promises    */

// Let's start with jQuery's promise pattern:

var wait = jQuery.Deferred(); // create a jQuery deferred object
var p = wait.promise();       // get a promise from that object

// define what happens when the promise gets resolved:
p.done( function(value){
  console.log("Promise resolved: " + value);
});


// promise will resolve after some time, which was spent doing some very important work!
setTimeout(function(){
  wait.resolve(Math.random()); // this will trigger the `done()` method of the inherent promise
}, 1000); // mimic 1 second of work


--------------------------------------------------------------------------------
