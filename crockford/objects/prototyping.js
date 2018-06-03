var MyObject = {};
var stooge = {
	"name" : "Henry",
	"age" : 25,
	"car" : "ford"
};
/*

	Check if 'create' function is present. Object always does, 
	so using a custom 'MyObject' here to create a new object 
	with its prototype set as the object passed as argument

*/
if (typeof MyObject.create !== 'function') {

	// if not,assign one
	MyObject.create = function(o){

		// create a new function
		// set it's prototype as the passed MyObject
		// return new instance of this newly created function
		var F = function(){};
		F.prototype = o ;
		return new F();


		// // This is wrong. Child gets same reference as parent object
		// return (new function(){}).prototype = o;

	};
}

var stooge2 = MyObject.create(stooge);
console.log(stooge === stooge2); //false


console.log(stooge2.name);						// Henry
console.log(JSON.stringify(stooge2,null,2));	// empty JSON

/*
	
	The prototype relationship is a dynamic relationship. 
	If we add a new property to a prototype, that property 
	will immediately be visible in all of the objects that are 
	based on that prototype:

*/

stooge.married = 'N';
console.log(stooge2.married);					// stooge2 gets stooge 'married' property


/*
	console.log() goes up prototype chain.
	JSON.stringify doesn't.
*/

stooge2.name = "Martin";						// overriding values
console.log(stooge2.name);						// Martin
console.log(JSON.stringify(stooge2,null,2));	// only name

/*
	use Object.hasOwnProperty() if you don't want to go up the prototype chain
	Since only stooge2.name was overridden, and all other values inherited from 
	the parent/prototype 'stooge', this will only output 'Martin'
*/

for( var eachKey in stooge ) {					// traverse keys in object
	if(stooge2.hasOwnProperty([eachKey]))
		console.log(stooge2[eachKey]);			// only name, 'Martin'
}