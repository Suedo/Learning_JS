console.clear()
console.log(new Date())

var multiply = (x,y,z) => x*y*z

console.log(multiply(1,2,3)) // 6
console.log(multiply(1,2)) // NaN : 1*2*undefined = NaN

// Mitigate this problem through currying:
// we will transform a function with n arguments into a curried series of unary function
// so, first lets define the curry-ing function

var curry = (fn) => {
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

console.log(curry(multiply)(1,2)) // returns a function, waiting for the third argument
console.log(curry(multiply)(1,2)(3)) // 6 , as all three arguments have been met