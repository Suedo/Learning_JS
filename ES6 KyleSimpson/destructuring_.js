// Nested Array Destructuring

function returnMix() {
  return [1, 2, 3, [4, 5, 6]];
}

var a, b, c, d, e, collect;

[, , c, [d, e] ] = 
[a, b, ...collect] = 
returnMix();
console.log(collect); // [ 3, [ 4, 5, 6 ] ]
console.log(c, d, e); // 3 4 5

