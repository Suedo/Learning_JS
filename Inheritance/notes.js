console.clear()
console.log(new Date())

// Starting off with KYLE ROBINSON's Javascript Prototypal Inheritance video
// https://www.youtube.com/watch?v=qMO-LTOrJaE&t=61s


function Bear(type) { this.type = type }        // this is a constructor. As such, 'B' in caps , signifying it should be called with new()
// var Bear = (type) => { this.type = type }    // this is NOT a constructor. cannot do new Bear().

// Let's say i want to add a growl method to the bears.
Bear.growl = () => console.log('grrr..')        // This will not reflect in the child instances


var grizzly = new Bear('grizzly')
var polar = new Bear('polar')
console.log(grizzly, polar)                     // Object { type: "grizzly" } Object { type: "polar" }.
// grizzly.growl()                              // Exception: TypeError: grizzly.growl is not a function


/*
New Bear. New Growl Tactics 
*/
function Bear2(type) {
  this.type = type;
// this.growl = function(){ console.log(type,'grrr... 2 '); } // can be done, but better add to prototype
}

// add growl to prototype, and it will be available to all children
// Two flavors: one as a proper function , other as a lambda
// 1. Function
Bear2.prototype.growl = function() {
  console.log(this.type + ' bear says grrr...') 
}

// 2. Lambda
Bear2.prototype.growlLamda = () => console.log(this.type + ' bear says grrr...')

var grizzly2 = new Bear2('grizzly')
var polar2 = new Bear2('polar')
console.log(grizzly2, polar2);                 // Object { type: "grizzly" } Object { type: "polar" }. Inherited properties don't showup
grizzly2.growl()                               // grizzly bear says grrr...
grizzly2.growlLamda()                          // undefined bear says grrr...


/*
Another way to instantiate a 'grizzly' from a bear is to create a Grizzly object that inherits Bear, and then
instantiating that Grizzly object. Demo below:
*/

// The wrong ways: 
var Grizzly = Object.create(Bear2)
// var griz = new Grizzly()                    // Exception: TypeError: Grizzly is not a constructor
// Grizzly.growl()                             // Exception: TypeError: Grizzly.growl is not a function
console.log(Grizzly)
console.log(Bear2, typeof Bear2)               // function Bear2() function

// ^^ Bear2 is just an expression, so it's blank unless we pass values to it. Hence the above method is not working


// Here's a better way:
function GrizzlyBear(){
  Bear2.call(this,'Grizzly')
}
GrizzlyBear.prototype = Object.create(Bear2.prototype)  // Assign prototype to get inheritance

var grizzly3 = new GrizzlyBear()
grizzly3.growl()                               // With prototype assignement: "Grizzly bear says grrr..."
// grizzly3.growl()                            // Without prototype assignement: "Exception: TypeError: grizzly3.growl is not a function"


// Override tests:
// 1. have a 'growl' method on the immediate object prototype. 
// This will not let the lookup go upto the prototype of the prototype (Bear2.prototype)

GrizzlyBear.prototype.growl = function() { console.log('GrizzlyBear overridden in prototype')}
grizzly3.growl()                               // GrizzlyBear overridden in prototype

// 2. Have a growl method on the object itself.
// This will prevent all lookup in the prototype chain

grizzly3.growl = function() { console.log('grrr right here right now!')}
grizzly3.growl()                               // grrr right here right now!


