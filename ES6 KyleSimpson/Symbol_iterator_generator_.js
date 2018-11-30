/**
 * Symbols : a special function type. 
 * a lot of default properties like iterators etc are basically Symbol function's methods.
 * var x = new Symbol("some name/desc that only helps to document. Not unique, multiple symbols can have this same value")
 * ^^ this creates a symbol, and you can access methods of nit now.
 * We are mostly ging to talk about iterator method of Symbol.
 */


var obj = {
  /*  
  Setting a function to a computed property "Symbol.iterator"
    [Symbol.iterator] : function() {
        // imperative iterator logic here
    }
  */

  // same thing above can be done as a concise function
  // Also, we add a "*" at the start : why?
  // 1. We want to create an iterator, and generators automatically gives us iterators
  // 2. The "*" makes this function a generator 
  *[Symbol.iterator]() {
    for(let i = this.start; i <= this.end; i++){
        yield this.values[i] // this gives back the value to the method calling iterable. a simple "return" won't work
    }
  },

  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  start: 0,
  end: 5
};

var x = [...obj]
console.log(x);

// Using iterator to create Haskell like range in JS:
// create a generator based iterator and assign it to the prototype of Number
// making it accessible to all numbers
Number.prototype[Symbol.iterator] = function* numberIterator(){
  for(let i = 0; i<=this; i++){
    yield i;
  }
}

console.log([...8]); // range of values from 0 to 8, inclusive

/**
 * ^^ the above range functionality is possible because the "..." operator treats 
 * primitive number as an object, autoboxing it. "this" refers to the boxed number
 */