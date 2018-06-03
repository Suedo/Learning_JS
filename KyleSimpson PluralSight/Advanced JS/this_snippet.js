console.clear()
console.log(new Date())

var o1 = {  
  bar: "bar1",
  foo: function(){ console.log(this.bar) }  
}

var o2 = {  
  bar: "bar2",
  foo: o1.foo 
}

var bar = "bar3"

var foo = o1.foo;



o1.foo()  // bar1
o2.foo()  // bar2
foo()     // bar3


/*
  Even though the 'parent' o1.foo is being called each time, 
  the value of 'this' depends on the enclosing object at call site.
  For foo() it's Global, for o2.foo() it's o2
*/