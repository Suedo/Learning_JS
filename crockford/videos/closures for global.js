// using closure to encapsulate globals
// we are hiding what would be an otherwise global 'names' inside a custom function, whose 'state' is the array,
// and has an anonymous method that takes in a number 'n' and returns the value of nth array element
var nonglobalnames = function () {
	var names = ["a","b","c","d"];

	return function(elem){ 
		return names[elem]; 
	};
}(); // function returns immediately becase of call


console.log(nonglobalnames(3)); //d


