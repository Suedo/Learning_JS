// qts: question to self. Needs future investifation

var G = {}

G.myForEach = (arr,fn) => {
  let i
  for(i=0; i<arr.length; i++){
    fn(arr[i])
  }
}

G.tellType = (args) => {
  console.log("typeof(" + args + ") : " + typeof(args));
}

G.processProp = (obj,fn) => {
  for(var property in obj){
    if(obj.hasOwnProperty(property))
      fn(property, obj[property])
  }
}

G.unless = (cond, fn) => {
  if(!cond)
    fn()
}

/*
  JS : GUARD vs DEFAULT ( '&&' vs '||'):
  http://seanmonstar.com/post/707078771/guard-and-default-operators
*/
// validate array content
G.every = (arr,fn) => {

  // assume every entry meets criteria, unless proven otherwise
  let result = true, i;

  for(i = 0; i<arr.length && result ; i++)
    result = result && fn(arr[i])
  console.log(i + " out of " + arr.length + " checked");
  return result
}

// opposite of every(). Check if atleast one meets criteria
// denoted by truthy return value of fn()
G.some = (arr,fn) => {

  // assume no entry meets criteria, unless proven otherwise
  let result = false, i;
  for(i = 0; i<arr.length && !result ; i++)
    result = result || fn(arr[i])
  console.log(i + " out of " + arr.length + " checked");
  return result
}

// JS objects are associative array. Display their inner structure
G.disp = (args) => {
  var type = typeof(args)
  console.log("\narg type: " + type)
  if(type === 'string' || type === 'object')
   for(var k in args) console.log(k + ": " + args[k])
  else
    console.log("arg value: " + args)
}

// Sort an array by particular properties
G.sortBy = (prop,order) => {

  // return a comparator based on the property passed
  return (obj1, obj2) => {

    // ascending or descending
    let det = 1;
    if(order === "rev") det = -1

    // closure at work: 'prop' wouldn't otherwise be visible
    return obj1[prop] > obj2[prop] ? det :
           obj1[prop] < obj2[prop] ? (-1)*det : 0

  }
}

// http://stackoverflow.com/a/42874698/2715083
G.unary = (f) => {
  return f.length === 1 ? f : (args) => f(args)
}

// A method for doing something only once
G.once = (doThisOnce) => {
  let executed = false
  // why function() here ? qts
  return function(){
    return executed ? undefined
      : ((executed = true), doThisOnce.apply(this, arguments))
  }
}


G.memoize = (fn) => {

  let lookup = {}               // lookup table (LUT)

  return (a) =>                 // return a func that 1st
    lookup[a]                   // checks for answer in the LUT, if not there,
    || ( lookup[a] = fn(a))     // calculates it and also stores it to the LUT

//   return a => {                                  // same thing
//     return lookup[a] || (lookup[a] = fn(a))
//   }

//   return function(a){                            // Also same thing
//     return lookup[a] || (lookup[a] = fn(a))
//   }

}

G.myMap = (args, fn) => {
  let result = [];
  for(const val of args) result.push(fn(val))
  return result
}

G.myFilter = (args, fn) => {
  let result = [];
  for(const val of args)
    fn(val) ? result.push(val) : undefined
  return result
}

G.myReduce = (args, fn, init) => {
  let acc = init;
  for(const val of args) acc = fn(acc,val)
  return acc
}

G.zipArr = (left,right,f) => {
  let result = [];
  for(let i = 0; i < Math.min(left.length,right.length); i++)
    result.push(f(left[i],right[i]))
  return result
}

// --- We are into Chapter 6 : Currying and Partial Func--------------------------

G.curry = (fn) => {
  if(typeof fn != 'function') throw Error('Currying needs a function');

  return function curriedFn(...args){

    // check if all the arguments needed for fn are here
    if(args.length < fn.length){
      return function(){
        return curriedFn.apply(null, args.concat(
                         [].slice.call(arguments)
        ));
      }
    }
    // If all arguments are here, just apply them
    return fn.apply(null, args);

  };
};

// The proper math compose
G.compose = (...fn) => c => {
  for(let i = fn.length - 1; i>=0; i--) c=fn[i](c)
  return c
}

// (f1,f2,f3 ... fn) => c => fn(...f3(f2(f1(c))))
// left to right FIFO function evaluation
G.pipe = (...fn) => c => {
  for(const f of fn) c = f(c)
  return c;
}

// Chap 8 : setting the stage for functors and Monads
const Context = function(val) { this.value = val }
Context.of = function(val) { return new Context(val) }
Context.prototype.map = function(fn){ return Context.of(fn(this.value)) }

G.Context = Context; // the container/context/box/whatever that holds a value

// The MayBe functor
const MayBe = function (val){ this.value = val }
MayBe.of = function(val){ return new MayBe(val) }
MayBe.prototype.isNothing = function(){ return ( this.value===null || this.value===undefined ) }
MayBe.prototype.map = function(fn){
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
}

G.MayBe = MayBe;

// The Either functor
// composed of 'Some' and 'Nothing' functors
const Either = {
  Some : Some,
  Nothing : Nothing
}
const Some = function(val) { this.value = val }
Some.of = function(val) { return new Some(val) }
Some.prototype.map = function(fn){
  return Some.of(fn(this.value));
}
const Nothing = function(val) { this.value = val }
Nothing.of = function(val) { return new Nothing(val) }
Nothing.prototype.map = function(fn){
  return this;  // returns same value without any changes, coz it's a Nothing!
}

G.Either = Either;


export default G
