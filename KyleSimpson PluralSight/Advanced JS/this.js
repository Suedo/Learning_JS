================================================================================
														THE THIS KEYWORD
================================================================================

/*
There are four rules to how the this keyword gets bound, and they all depend on what is known as the call site.
The call site is the place in code where a function gets executed. Based on the call site, we determine
if the function was called standalone, or as a method of another object, or as a constructor via the 'new' keyword.

	"How does it get called?" > that's the only thing that matters as far as what gets assigned to 'this'

  -- four ways of `this` binding are explained below, ending with a final SUMMARY

*/

/*
	default binding. 4th in order of precedence
			and
	implicit binding. 3rd in order of precedence

	default binding: function is called as a standalone one. 'this' becomes global(non-strict) or undefined(strict mode)
	implicit binding: called via another owning/containing object. 'this' becomes the owning object

*/

function foo () {
	console.log(this.bar);
}

var o1 = {
	bar: "barO",
	foo: function(){
		console.log(this.bar);
	}
}

var bar = "bar1";
var o2 = { bar: "bar2", foo: foo };
var o3 = { bar: "bar3", foo: foo };

foo();			// "bar1" - DEFAULT binding ( standalone call site, 'this' set to GLOBAL/undefined based on non-strict/strict mode). this case applies to IIFEs as well

// in each of the below, we have an method-ic call site, and 'this' is set to the owning/containing object (o1,o2,o3 etc)
// And as such, these are all implicit bindings
o1.foo() 		// "barO"
o2.foo();		// "bar2"
o3.foo();		// "bar3"


/*
	1. The default binding applies to IIFEs as they are just an immediate standalone execution of a function
	2. Strict mode: not the entire program, but what it is inside the function where 'this' gets invoked (foo). Does not matter what mode the outer code follows.
	3. in 'o2.foo()' o2 is referencing the same foo() as the standalone foo(). in JS, everything is pass by reference, and invocation of foo() goes to the same foo()

*/

--------------------------------------------------------------------------------

/*
	explicit binding. 2nd in order of preference

		1. We use call/apply at the call site to pass in an object that will be used as 'this'
			doing `foo.call(obj)` or `foo.apply(obj)` makes `this` inside `foo` refer obj

		2. Hard binding using bind()

*/

/* 	call/apply example */
function foo () {
	console.log(this.bar);
}

var bar = "bar1";
var obj = { bar: "bar2" }

foo();  				// "bar1"
foo.call(obj)  	// "bar2"

/*
	bind() example1 : we made our own simple bind() function.

	Note: it is very important to notice the call site in such cases. when you are wrapping a function
	inside a hard-bound wrapper, that is no longer the call site. And as we know, the value of this depends on how
	the function is invoked at the call site. In this example, the call site is the `fn.call(o)`, and there, we see
	`this` gets bound to `o`, and a new function with this modified this binding is returned. no more call/apply
	method will work on this returned value. Thus, making the hard-binding get its name : 'hard'

*/

function bind(fn, o) {
	return function() {
		fn.call(o);			// this is the call site
	};
}

function foo() {
	console.log(this.bar);
}

var obj = { bar: "bar" }
var obj2 = { bar: "bar2" }

foo = bind(foo,obj)  // foo is hard-bound to `obj`

foo() 					// "bar"
foo.call(obj2) 	// already hard-bound, this has no effect



/*   updating the above bind() to be more like the official version: We are calling this bind2()
		below is a simplified version of bind2(). Checkout the MDN page on bind() to get latest info
*/

if(!Function.prototype.bind2){
	Function.prototype.bind2 = function(o){
		var fn = this; // notice the call site, 'this' points to `obj`
		return function() { fn.apply(o, arguments) }; // create and return a new function with `this` bound to `obj`
	};
}

function foo(baz) {
	console.log(this.bar +  " : " + baz);
}

var obj = { bar: "bar"};

foo = foo.bind2(obj);  // bind `this` of foo to be obj
foo("baz");  		// "bar : bazz" . This is the call site


--------------------------------------------------------------------------------

/*
	binding with the `new` keyword . 1st in order of preference

	the `new` keyword turns any function call into a constructor call

	Four things that happen when you put a `new` before a function call:
		1. A new object is created out of thin air! POOF!
		2. The POOF! object gets linked to another object
		3. the new POOF objet gets bound as `this` for the purposes of that function call
		4. if no specific return type specied in the function, it will return `this`

*/

function foo()  {
	this.baz = "baz";
	console.log(this.bar  + " " + baz );
	// return this; // implicitly returns the new POOF object
}

var bar = "bar";
var baz = new foo(); 			// "undefined undefined"
console.log(baz.baz);  		// "baz"


--------------------------------------------------------------------------------
                          SUMMARY
--------------------------------------------------------------------------------

/*
    In order of precedence, how the 'this' wil be bound?
  		We can determine the answer by going to the call site and asking the below four
  		questions in the specific order/precedence untill we get an answer.
  		(max depth : 4)

  (Highest precedence)
      1. was the function called with 'new' ?		(new/constructor binding)
			2. was the function called with 'call' or 'apply' ? (explicit/hard binding)
			3. was the function called via an owning/containing object ? (implicit binding)
	    4. DEFAULT : global function call. (default binding, `this` gets `undefined`/`GLOBAL` based on whether or not strict mode applies)
  (lowest precedence)

*/

================================================================================
