/**
 * CONST :
 * creates a reference that cannot be reassigned. The value at the reference can always be changed.
 * To ensure VALUE does not change, use Object.freeze() instead of "const"
 */

const PI = 3.14
console.log(PI)
// PI = 4; // this will give error, as we are trying to re-assign value.

var x = Object.freeze([10, 20, 30]);
var y = [10,20,30]

x[0] = 30   // will NOT modify. Object frozen. Value doe not change
y[0] = 30   // will modify

console.log(x);     // [ 10, 20, 30 ]
console.log(y);     // [ 30, 20, 30 ]

/**
 * var with Object.freeze() vs const:
 * 
 * >> var w\ Object.freeze() allows reference to change, but the initial frozen value cannot be changed
 * >> const allows object pointed by the const to change its value, but the pointer/reference cannot change. 
 */
