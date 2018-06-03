function curry(func){
	
	console.log(Array.prototype.slice.call(arguments)); // [ [Function: add], 2 ] 
	
	var args = Array.prototype.slice.call(arguments,1); // [ 2 ]
	
	console.log(args);
	
	return function(a){
		
		console.log(Array.prototype.slice.call(arguments)); // [ 6 ]
		// console.log(a); // [ 6 ]
		
		return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
	}
}

var inc = curry(function add(a,b){
	return a * b;
},2);

console.log(inc(6)); // inc() is basically anon func(a), and 'a' is optional