// // needs this particular ../parent_folder/child_file.js format
import G from '../functions/myStore.js';
import D from '../functions/data.js';

G.myForEach(['som','jit','nag'], (args) => {console.log(args);})
G.tellType("som")

// -----------------------------------------------------------------------------
console.log("\n\n");
G.processProp(D.testObj, (k,v) => {
  G.unless(v === 26, () => {
     console.log(k + " : " + v)
  })
})

// -----------------------------------------------------------------------------
console.log("\n\n");
let isEven = (args) => { return args%2 ===0 }
console.log(G.every([4,6,8,9,4,10,5] , isEven )) // 4 out of 7 checked; false

// -----------------------------------------------------------------------------
console.log("\n\n");
let isOdd = (args) => { return args%2 ===1 }
console.log(G.some([4,6,8,9,4,10,5] , isOdd )) // 4 out of 7 checked; true

// -----------------------------------------------------------------------------
G.disp("somjit")

// -----------------------------------------------------------------------------
// Sort the array in descending order of age
var sortedArr = D.nameArr.sort(G.sortBy('age','rev'))

for(let i = 0; i < sortedArr.length ; i++){
  console.log(JSON.stringify(sortedArr[i], null, 2))
}

// -----------------------------------------------------------------------------
// Basic currying and working with map.
// CHeck: http://stackoverflow.com/a/42874698/2715083
console.log([1,'2',2,'3'].map(G.unary(parseInt)))

// -----------------------------------------------------------------------------
// Designing functions that work only once
var myBalance = 100
var plus100 = G.once((args) => {return args+100} )

// Legit increment of balance by 100 points
myBalance = plus100(myBalance)
console.log(myBalance);

// But not anymore
myBalance = plus100(myBalance)
console.log(myBalance); // undefined

// -----------------------------------------------------------------------------
// memoized recusrsion
let memoizedFact = G.memoize((n) => {
  if( n===0 ) return 1
  return n * memoizedFact(n-1)
})

console.log("Factorial of 6: " + memoizedFact(6))

// --- And that's the end of Chapter 4 -----------------------------------------

console.log('testing map: increment by 1');
console.log(G.myMap([1,2,3], x => x+1)); // [ 2, 3, 4 ]

console.log('testing filter: is even? ');
console.log(G.myFilter([1,2,3], x => x%2 === 0 )); // [ 2 ]

console.log('testing reduce: sum');
console.log(G.myReduce([2,3,5], (acc,val) => acc + val)); // 10

console.log('testing zipping: using a sum function');
console.log(G.zipArr([1,2,3],[10,12,13], (x,y) => x + y)); // [ 11, 14, 16 ]

// some convoluted zipping example from the book using Object.assign(),
// among others, are being ignored here.

// --- And that's the end of Chapter 5 -----------------------------------------

// various examples of currying: A two argument function is setup using
// only one arg, waiting for the second arg

let match = G.curry((regex, str) => str.match(regex))
let hasANumber = match(/[0-9]+/) // regex given, text string not

let filter = G.curry( (fn,arr) => arr.filter(fn) )
let arrElemsHavingNumber = filter(hasANumber)

console.log(arrElemsHavingNumber(
  ['somjit','abc1','def5','nag'])); // [ 'abc1', 'def5' ]

// leaving out partial functions coz i tried, but don't get them
// i like curry, and it's advisable to be wither or anyway!

// --- And that's the end of Chapter 5 -----------------------------------------

console.log("\n------------------------------------------\n")

// compose and pipe are opposite in direction
// compose comes from math : p = f(g(x)) === p = compose(f,g)
// Also, The functional composition is always associative:
// compose(f, compose(g, h)) == compose(compose(f, g), h);
// order of evaluation of functions mentioned in compose goes from
// right to left, but as programmers, we like to think left to right,
// and hence, the pipe: p = f(g(x)) === pipe(g,f)
var roundIt = G.pipe(parseFloat,Math.round);
console.log(roundIt("36.6aaa")); // 37

var compV2 = G.pipe(x => x + "6.6aaa" , roundIt, x=>x+5);
console.log(compV2(3)); // 3 >> 36.6aaa >> 37 >> 42  (!the ultimate answer!)

console.log(G.compose(Math.round,parseFloat)("36.6aa")); // 37

// --- Starting Chapter 8 ------------------------------------------------------

// Basic Functor
var functor = G.Context.of(3).map(x => x + "6.6aaa")
                .map(x => parseFloat(x))
                // .map(x => undefined ) // gives undefined if last map made
                .map(x => Math.round(x)) // 37 || Math.round(undefined) == NaN
                .map(x => x+5 ) // 42 || NaN + 5 = NaN
console.log("Value of functor : " + functor.value);

// zen-"ish" because you're not getting null here, though begining with it
var zen_ish = G.Context.of().map( x => x + 5)
console.log("Value of functor : " + zen_ish.value); // NaN

// Array is a functor ( has a map which returns an Array )
console.log([functor,zen_ish].map(x => x.value +5) );


// MayBe Functor: Handles null cases like it should! ftw
var functor2 = G.MayBe.of(3).map(x => x + "6.6aaa")
                .map(x => parseFloat(x))
                .map(x => undefined ) // gives null if last map made
                .map(x => Math.round(x)) // 37 || null
                .map(x => x+5 ) // 42 || null
console.log("Value of MayBe functor : " + functor2.value);

// https://medium.com/@tzehsiang/javascript-functor-applicative-monads-in-pictures-b567c6415221
// "Like Morpheus in the Matrix, map knows just what to do;
// you start with None, and you end up with None! map is zen"
var zen = G.MayBe.of().map( x => x + 5)
console.log("Zen Value : " + zen.value); // null


// Either Functor
// need to find a good demo. Don't like the one in the book

// skiping the subreddit example. Don't like it much. It might come up later

// --- And that's the end of Chapter 8 -----------------------------------------
