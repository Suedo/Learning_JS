console.clear()
var log = (bla) => { console.log(bla)} // too lazy

var fruits = ['Apple', 'Banana'];

log(typeof fruits.map((f) => {console.log("new " + f)})) // object
log(typeof fruits.forEach((f) => {console.log("forEach : " + f)})) // undefined

// Has some STACK feels to it
fruits.push('JackFruit')                             // add to end
log(fruits[fruits.length - 1])                       // JackFruit added to the end
log(fruits.pop() + ", new length: " + fruits.length) // JackFruit, new length: 2

// Listiness
log(fruits.shift())            // pop from front, returns popped element: 'Apple'
log(fruits.unshift('Papaya'))  // add to front, returns new size : 2
log(fruits)                    // [ "Papaya", "Banana" ]

fruits.push('Mango');          // [ "Papaya", "Banana", "Mango" ]
log(fruits.indexOf('Banana')); // 1 ( not giving ';' here gives a type error here!!)

// Slice and Splice
['Chikku', 'Orange', 'Grapes', 'Apple', 'BlueBerry'].forEach( (args) => fruits.push(args));
log(fruits) // [ "Papaya", "Banana", "Mango", "Chikku", "Orange", "Grapes", "Apple", "BlueBerry" ]

// Slice returns new array, does not modify the old one
log(fruits.slice(-4, -2))      // [ "Orange", "Grapes" ]
log(fruits.slice(-4, 2))       // [ ]  : does not work. Only left to right slicing
log(fruits.slice(4,6))         // [ "Orange", "Grapes" ]
log(fruits.length)             // still 8

var copy = fruits.slice()      // copy of fruits, No shared reference.
