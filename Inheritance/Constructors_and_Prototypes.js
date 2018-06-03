// http://tobyho.com/2010/11/22/javascript-constructors-and/

console.clear()
function Person(name){ this.name = name }

new Person('Somjit')  // Constructor, Object { name: "Somjit" }
Person('Tommy')       // Function, not a constructor, this ties to GLOBAL, sets/creates a 'name' and assigns it a value
name                  // 'Tommy'. name is (unintetionally) created in the GLOBAL namespace

// If someone accidentally calls the constructor as a function, you might
// lead to polluting the gloabl namespace unnecessarily, as with the 'name' key above
// This cam be mitigated as thus :
function Person(name){
  if(!(this instanceof Person)){ // would be if called with new()
    return new Person(name)      // the default behavior
  }
  this.name = name               // write to local scope, instead of global
}

Person('Tom')                    // Object { name: "Tom" } , Called as a Function
new Person('Tom')                // Object { name: "Tom" } , Called as a constructor. Both give same results


/* Methods:
     Method: Behavior of the object
     Apart from constructors and Functions, a function can also be used as a Method. 
     Always associated with an Object, done to chaining.
     
     Methods can be 

*/

// You can code in the method inside the object itself
// No constructor needed. Also, it's bad for inheritance
function Person2(name){
  
  this.name  = 'Somjit'          // this is not JSON, and thus, also needs 'this'
  this.sayHi = function(){  (console.log('Hi, I am ' + this.name))  }
  
}

// The better way to do it is to attach the method to the prototype
/*
  
  In Java, inheritance would work like this:
  
  public class Mammal{
    public void breathe(){
       // code for breathing
    }
  }
  
  public class Cat extends Mammal{
    
    // now the cat inherits them breathing skills!
    
  }
  
  Here's how we would do that in Javascript:
*/

// Our Public Mammal class
function Mammal(name){
  this.name = name
}

// Everyone who inherits Mammal will also get the breathe function
// This saves memory, as this is the only time and place the 'breathe' method is defined
Mammal.prototype.breathe = function(){ console.log('Mammal breath! ' + this.name + ' is breathing! ') }


// This is our child class, only technically,it isn't a child yet
function Cat(name){ this.name = name }

// This ties Cat as the child of Mammal
Cat.prototype = new Mammal()


// Testing: 
var kitty = new Cat('kitty')      // undefined
kitty.breathe()                   // Mammal breath! kitty is breathing! 


/* Apply and Call

   Functions become methods just by virtue of attaching them to objects. 
   The 'this' value is not attached to a particular object untill you call the function.
   When one function(i.e. child object) is called, 'this' then points to that child. So:
   
   var brownCat = new Cat('BrownCat')
   brownCat.breathe()     // Mammal breath! BrownCat is breathing! 
   
   in the above, this.name points to the name of the function being called, and not attached strictly 
   to any particular object/function. If we want that to be the case, we can use Apply():
   
*/   
   
var brownCat = new Cat('BrownCat')

function Flower(name){ this.name = name ; } // notice we have no methods here
var tulip = new Flower('tulip')


// Before: this points to parent function of the method
brownCat.breathe()              // Mammal breath! BrownCat is breathing! 

// After : this manually made to pint to the object being passed
brownCat.breathe.apply(tulip)   // Mammal breath! tulip is breathing! 


