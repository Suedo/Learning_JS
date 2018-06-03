// the later method:
// the later method causes a method of an object to be invoked in the future

if ( !typeof(Object.prototype.later) !== 'function' ) {
	
	Object.prototype.later = function (msec,ourMethod) {
		var that = this;
		
		// get the arguments to call our method with
		// var args = Array.prototype.slice.apply(arguments, [2]); //apply version
		var args = Array.prototype.slice.call(arguments, 2) //call vesrion

		// get the actual method from its string namesake
		if(typeof(ourMethod) === 'string'){
			ourMethod = that[ourMethod]; 
		}

		// call the method with arguments
		setTimeout(function () {
			ourMethod.apply(that, args)
		}, msec)


		// finish and return
		console.log("wait for it...")

		return that; // cascade: allows stuff like : obj.later(...).later(...) ... and so on

	};
}


var person = {};

person.introduce = function (fname, lname, hobby) {
	console.log("My name is " + fname + " " + lname + " and my hobby is " + hobby);
};


person.later(2500, "introduce", "Scott", "Tiger", "playing with SQL");