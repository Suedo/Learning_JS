// Check out: https://gist.github.com/mikaelbr/9900818

console.clear()
var d = new Date()
console.log(d.getHours() + " : " + d.getMinutes() + " : " + d.getSeconds() + "\n")

var [a,b,c] = [1,2,3]
console.log(c) // 3

var {user: x} = {user: "somjit"}
console.log(x) // somjit

// Fail Safe
var {user: x} = {user2: "somjit"}
console.log(x) // undefined 

// Does not have to be in any particular order, give any name u want
var {age:a, user:u} = {user:"somjit", age:27}
console.log(a) // 27

// Starting with { implies a block scope, not an object literal. 
// () converts to an expression.
var a, b;
({ a, b } = {a: 1, b: 2}); // { a, b } = {a: 1, b: 2}; <- this would not work
console.log(a, b); // 1 2

// Check : https://gist.github.com/vasco3/22b09ef0ca5e0f8c5996#irrefutable-pattern
// Mozilla doesn't seem to be supporting it yet though