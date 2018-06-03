// https://www.youtube.com/watch?v=PtD-WKSC6ak
/*

What is a category?
It's a set of Objects : ob(C)
+ A set of Morphisms : hom(C)

Objects and Morphisms == Noun and verbs

Two laws:
1. Identity: For every object in a category, there has to be an operation that
             takes the object and returns the same object
        i: a -> a
2. Composition:
    if, g: a -> b
        f: b -> c
    then, f(g): a -> c
*/

// JS Identity:
function id(a){ return a }

// JS compose:
function cmps( f,g ){
  return function( a ){
    return f(g(a))
  }
}


/* Category HTML: */

// HTML OBJECT: ob(HTML): {HTMLElement}
document.querySelector( '#sample' )  // DOM element: This is an HTML object

// HTML Morphisms: hom(HTML)
// Take an elem (HTMLElement), return elem (HTMLElement)
function setFoo( elem ){
  elem.setAttribute("class","foo")  // does something with elem
  return elem  // return modified element
}

/* category JQUERY */

// JQUERY object: ob(JQUERY): {JQUERY}
$( '#sample' )      // an id with '#sample'

// JQUERY morphism: hom(JQUERY): These are just jQuery methods
$( '#sample' ).hide()

// Category laws implementation:
jQuery.fn.id = function(){ return this } // Identity in jQuery
jQuery.cmps = function( f,g ){           // Composition in jQuery
  return function(){
    return f.apply(g.apply(this))
  }
}


/* Note: Chaining === composition */

/*
A functor is a purely categoric theory concept: gets you from one category to other
like:  a functor for HTML -> JQUERY

For a fucntor like that, you need three things:
  ob(HTML) -> ob(JQUERY)           // objects
  hom(HTML) -> hom(JQUERY)         // Morphisms
  F(f)F(g) = F(fg)                 // composition of Morphisms

Below are examples of these three laws
*/

// === Object law ===

document.querySelector('div')         // HTML Object
$(document.querySelector('div'))      // jQuery Object made from HTML object


// === Morphism Law ===
setFoo( sample )                      // This was an HTML morphism, see above
$( 'sample' ).setFoo()                // Jquery Morphism that does the same thing
