// Nested Array Destructuring

function returnMix() {
  return [1, 2, 3, [4, 5, 6]];
}
function returnObject() {
  return { p:2, q:3, r:4};
}

var a, b, c, d, e, collect;

[, , c, 
    [d, e]
] = 
[a, b, ...collect] = 
returnMix();
console.log(collect); // [ 3, [ 4, 5, 6 ] ]
console.log(c, d, e); // 3 4 5


/**
 * Object destructuring
 */

var {
  p,
  q: X, // value of q from returned object goes to X
  r,
  s: Y = 50
} = returnObject()

console.log(JSON.stringify(returnObject(),null,2));

console.log("value of X and Y :",X,Y);