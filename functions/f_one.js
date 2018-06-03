/*

	There are four patterns of invocation in JavaScript:
	1. Method invocation pattern, 2. Function invocation pattern
	3. Constructor invocation pattern, 4. Call/Apply invocation pattern

*/

var add = function(a,b){
	return a+b;
};

var myObj = {
	num: 5,
	increment: function(a){
		return this.num + a;
	}
};

// Method Invocation:
// 'increment(num)' is invoked as a method belonging to object 'myObj'
console.log(" Invoking as a method: " + myObj.increment(5)); 


// Function invocation 
// functions are called standalone
console.log(" Invoking as a function: " + add(5,3));