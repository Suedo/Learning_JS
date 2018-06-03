/*
Links:
https://developer.mozilla.org/en-US/docs/Web/JavaScript
https://github.com/rwaldron/idiomatic.js
https://www.ecma-international.org/ecma-262/8.0/index.html
*/

/*
We are going to anthropomorphise JS engine: Basically, converse with it like  it's human

*/

// a function declaration is : the function keyword followed by parens, followed by a block of code
/* The smallest atomic unit of scope in JS is the function
	1. Finding declarations of variables and functions and putting them into their appropriate scope parts. (the first pass)
		The appropriate scope is the current scope. So, if it sees a var declaration while in GLOBAL scope, it's going to assign that var to the GLOBAL scope

*/

/* looks like a single statement, but is actually two, which happens at completely different time frames:
	1. first pass: sees foo as a variable declaration. Assigns it to current scope: GLOBAL
	2. second pass: actually execute the program with the guesses made during the first pass

	Some terms:
	foo > LHS reference; "bar" >> rhs value
	on a broader term: LHS is the source, and the RHS is the value
	*/
var foo = "bar"



function bar() {      // the function enters scope bar here
	var foo = "baz";  // foo gets the current scope: bar

	/*^^ js engine going to ask Scope Manager (bar) if it knows an LHS reference named 'foo'
			always ask local scope first, before going anywhere else
	*/
}

function baz(foo) { // scope: baz
	foo = "bam";    // gets scope : baz
	bam = "yay";

	/*
		in here, 'foo' is a passed variable, and when 'foo="bam"' is executed,
		when an LHS reference of foo is sought, scope manager does recognize it
		but when ' bam = "yay" ' is evaluated, since first-pass scope resolution did not see a
		var declaration for bam, the scope manager's (local) does not recognize it. So what now?
		We go out one level, from the local scope to GLOBAL scope, and then say:
		"hey global scope, do you have an LHS ref for bam?", to which, the Scope Manager is going to
		create it!!! We will now get a global variable 'bam' created accidentally because it was not in local scope.
		This is known as leakage of scope . ( the global creation can be avoided if we used Strict mode, then Scope Manager
		would have said: Nope, never heard of it!)

		Strict mode: absolutely must need a function or a var for declaration.
	*/

}


/*
	during the second pass of `var foo = "bar" `, the js engine is going to ask the scope manager:
	" hey global scope, have you heard of an LHS reference of "foo" ?" (the first pass has established foo as a LHS reference)
		"yes I've heard of him" and gives back the reference
*/






=========================================================================================================================================================

/*  Function compilation  */

// pass1: declaration of foo registered to Global scope
// pass2: LHS reference of foo exists? > yes > value "bar" assigned to previously registered global variable foo
var foo = "bar";

// pass1: declaration of function bar is registered to global scope
// pass2: bar is not invoked, so no pass2
function bar() {
	// pass1:
	// 			recusively descent after registering LHS reference of bar
	// 			LHS reference of foo is registered
	// pass2: LHS reference of foo exists? > yes > value "baz" assigned to previously registered LHS reference
	var foo = "baz";
}

// pass1: declaration of function baz registered to Global scope
// pass2: baz is not invoked, so no pass2
function baz(foo){
	// arguments are registered to the functions scope. Thus, foo, as an implied declaration, gets registered to baz's scope

	foo = "bam";

	// pass1 : no 'var', thus no declaration for bam
	// pass2:
	// 			no strict mode: Scope of baz has LHS reference of bam > no > go fish in higher scopes >> ultimately lands in GLOBAL scope, and there too, no LHS exist, so a new Global variable is created, and "yay" assigned to it. This is known as leakage of scope.
	// 			strict mode: in a similar move as above, goes upto GLOBAL scope, and even there no LHS reference of bam exist > no variable created > throws error
	bam = "yay";
}

=========================================================================================================================================================


// pass1: LHS reference foo declared and assigned to global scope
// pass2: the 'var' keyword does not exist now, it existed only during compilation phase. Just assignment is done to pre-declared variable
var foo = "bar"

// pass1: function bar registered to global scope
// pass2: these don't exist anymore, they have been compiled away
function bar() {

	//pass1: "hey scope of bar, I have a declaration for variable 'foo' >> registered
	//pass2: from bar() >> "hey scope of bar, I have LHS reference for variable 'foo, you know him?' >> 'yup, here is the reference' >> to which, "baz" gets assigned
	var foo = "baz";

	//pass1: "hey scope of bar, I have a declaration for function 'baz' >> registered
	//pass2: from bar() >> nothing done, already compiled away, go to 'baz()'
	//pass3: from baz() >> function invocation , so we go in:
	function baz(foo) {

		//pass1: "hey scope of bar, I have a declaration for named parameter 'foo' >> registered
		//pass2: from baz() >> asks scope: know LHS ref for foo ? it does know, and local reference to foo is returned, to which "bam" is assigned. This is called shadowing
		foo = "bam";

		//pass1: no declaration done here!
		//pass2: from baz() >> asks local scope(baz) for LHS reference to bam : Nope! go fish!
		//						goes out one level, asks scope of bar for LHS reference to 'bam' : nope! go fish!
		//							goes out one level, asks GLOBAL scope for the same:
		//								in strict mode: GLOBAL responds: Nope! >> error
		//								in normal mode: GLOBAL responds: Nope! let me create one for you, gets "yay" value! >> scope leakage , global created : BAD!!
		bam = "yay";
	}

	//pass1: no declaration done here
	//pass2: from bar() >> "hey scope of bar, I have an RHS reference for baz: gets returned the fnction >> executes it
	baz();
}

bar() // ask GLOBAL scope for RHS reference to bar. RHS because no assignment is going on here. returned the value, the function, which is then executed
foo;  // asks GLOBAL : RHS reference for foo? gets returned 'bar'
bam;  // asks GLOBAL : RHS reference for bam? gets returned 'yay' (in normal mode) (recently created due to scope leakage)
baz();// asks GLOBAL : RHS reference for baz ? nope! throw referenceError ( does not create a blank function, like it does for a variable when RHS reference does not exist ) (referenceError on unknown RHS function reference happens in both Strict and non-strict mode)


/*

'var' s exist only during compilation phase. As soon as one variable is compiled, irrespective of how many times (in the same scope) it is wriiten with a var statement, these 2nd var and onwards will not be counted.

thus:

var a = 5; // compile time declaration happens only here
var a = 6; // From here on, these var-s don't matter, only assignment happens during execution time
var a = 7;
var a;  // a is not re declared and set to undefined

console.log(a)

*/

=========================================================================================================================================================

// Difference between function declaration and function expression

// Function bar is not a declaration:
//		function declaration : 'function' keyword is the very first keyword in the statement
//		here, var is the first word, so it's not a function declaration, but a function expression
//		this is a named function expression. Better to use these than anonymous functions
//		named expression's have their own scope, which resides inside their body, so referencing them from GLOBAL causes referenceError. Function declaration does not have this error.
var foo = function bar() {

	var foo = "baz";

	// baz is a function, by the above rule
	function baz(foo) {

		foo = bar;
		foo;

	}
	baz();
}


foo();
bar();


/* Negatives of ANONYMOUS function expressions:
	1. No way to reference itself from within the function. thus, stuff like recursion does not work ('this' does not help either)
	2. Don't help with debugging. Named functions pop up nicely in debug stack traces.
	3. Named functions Self documents the code. Without a name, you have to look at the outer/calling context to figure out what it's going to do
One should always prefer named function expressions over anonymous function expressions or function declarations

One might argue: even if we have an anonymous function expression, it *will* assigned to a variable (foo) in our case, so can't we just call/recurse it using that?
                Ans: 1. A variable in Outer Scope is outside our control. Can change.. then problem!
                      2.  We are doing some shadowing, i.e. have an inner foo being assigned something else, and thus/then we can no access the outer foo reference to the function.
*/

/* little known Fact:
      Catch black (of the try-catch type) has a block scope!. So the saying that all of JS is lexical scope
      (aka Closure, aka compile time scope, aka static scope) only is false.
*/

// Also, function expressions don't get hoisted, but function declarations do

=========================================================================================================================================================


/* IIFE Pattern */


var foo = "foo";

/*
	Immediately Invoked Function Expression
 	the first word in the below statement is a '(' , not a 'function', thus making it an 'Expression' and NOT a 'Declaration'
 	below example is alo anonymous, thus, outer scope is not  polluted with a new name. However, it is recommended that you DO use a name: helps in debugging
*/
(function() {

	// hide all this stuff in this new scope
	var foo = "foo2";
	console.log(foo);		// "foo2"

})(); 		// the () executes the evaluated function

console.log(foo);		// "foo"

/*
	^^ anthropomorphically speaking: the runtime (it was compiled ahead of time in the normal multipass way) will say "hey I have a function expression that is of Immediate value (like 42 or "foo" string etc)"" >> and the  pre-complied function would be returned, and executed due to the presence of the '()' at the end
*/


/* Useful variations of the IIFE pattern */

var foo = "I'm the Global foo";

(function aliasify(global) {

	var foo = "I'm your friendly local foo :)";		// local object
	console.log(foo);		// I'm your friendly local foo :)

  console.log(global.foo); // I'm the Global foo

})(this);   // pass in a global object like window, jQuery etc and alias it as something else inside the function

/*
	This aliasing helps to clearly separate the private scope variables inside the function from the global/outer scope functions. You may have 10 variables inside the function, but for only one, you want to use the outer/global value. In that case, you do 'global.<your property>' , like `global.foo` above. This is a widely used tactic in jQuery to enforce the '$' sign to imply the jQuery object. The IIFE is called with 'jQuery' as the parameter, and during execution, we alias it as '$'

	(function aliasify($) {

		$.<some jQuery method here>

	})(jQuery);

*/


=========================================================================================================================================================

/* The Let Keyword */


function foo(bar) {

	if (bar) {

		let baz = bar;

		if (baz) {
			let bam = baz;
		}

		console.log(bam); // Error

	} console.log(baz) // Error
}

foo("bar")


/* Problems with LET

	https://github.com/getify/let-er : Kyle Simpson's version on how to better use LET.

	This basically lets you write let-blocks much like Java 1.7 (and above) try-with-resources black, where the resources to be used are written like arguments to the try block, in the same way, the variables you want to use with let are written like a parameter to LET.

	This let-er does not impact let declarations, ( let x = 5 type of code ) but only things like :

	let (x = "foo") {	// variables passed in as arguments
		console.log(x); // "foo"
	}


*/


=========================================================================================================================================================

/* QUIZ */

/*
How to cheat Lexical Scope :

	1. with()
	2. eval


What are the diferent ways of creating scope:

	1. FunctionS
	2. Catch Block
	3. Curly braces with LET keyword


Difference between undeclared and undefined ?

	1. undefined is a value
	2. undefined : currently does not have a value
	3. undeclared : leads to referenceError. the thing does not exist even.
*/


=========================================================================================================================================================

/* HOISTING */

a;			// undefined
b;			// undefined
var a = b;   // these are hoisted to the top during compile phase, thus undefined instead of referenceError
var b = 2;
b;

=========================================================================================================================================================
