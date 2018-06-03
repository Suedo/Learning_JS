console.clear()
console.log(new Date())

/*
  Functions are hoisted above var declarations. This is why the first console.log shows a function.
  Also, since we have two functions with the same name, the one coming later overrides the one coming before.
  Thus we have "bar" being displayed and not "foo"
*/

console.log(foo);                     // function foo()
foo();                                // bar

var foo = 2;
console.log(foo);                     // 2


function foo() { console.log("foo") }
function foo() { console.log("bar") }
