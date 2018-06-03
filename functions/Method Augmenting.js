/*
	A public addMethod() method accesible to all functions is added by
	attaching it to the prototype of the Function class
*/
Function.prototype.addMethod = function(name,func){
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
};

// By Default, JS String doesn't have a string method
// console.log(String.trim(" hkh "));  // TypeError: String.trim is not a function
// So, we add it
String.addMethod("trim", function(){

	// "^\s+" ==> whitespace at start, "\s+$" ==> whitespace at end
	// /regex/g modifier is used to perform a global match 
	// ie, (find all matches rather than stopping after the first match)
	return this.replace("/^\s+|\s+$/g","");
});

console.log(" somjit ".trim()); // "somjit"


/*
	JS also does not have an Integer type. So we add one here. 
	This will give the integer part of a number/float
*/
Number.addMethod('integer', function () {
	return Math[this < 0 ? 'ceiling' : 'floor'](this);
});

console.log(55.6.integer()); // 55
console.log(-3.33.integer()); // 55

/*
	Interestingly enough, the below code throws an error:
	Math[(intermediate value)(intermediate value)(intermediate value)] is not a function
*/
console.log((-3.33).integer());