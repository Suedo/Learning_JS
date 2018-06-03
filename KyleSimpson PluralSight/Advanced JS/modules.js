/*

  Classic Module Pattern: A way of encapsulation (originally pointed by doug crokford n all)
    1. There must be an outer wrapping function that gets it executed. May/may not be an IIFE
    2. It must return one or more functions that get returned from that function call, i.e. one or more inner functions that have access to inner function scope.

*/

var foo = (function(){
  var o = { bar: "bar"};
  return { // this is the function that we return, through which we can hold on to the inner scope
    bar: function() {
      console.log(o.bar); // holds on to inner scope
    }
  }
})();

foo.bar(); // "bar"

// Upgrade:
var foo = (function bam(){ // always use a name
  /*
     it's better to keep an internal reference to what is being returned, so that:
      1. we can modify it's contents at runtime if needed
      2. as well as a stylistic choice, as we know these will be public, vs the other function contents
          that are not exposed to the outer world via `return`, and thus, kept private
  */
  var publicApi = {
    bar: function() {
      publicApi.baz();
    },
    baz: function() {
      console.log("baz");
    }
  }
})()
