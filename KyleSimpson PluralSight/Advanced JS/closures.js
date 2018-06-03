function foo() {
  var bar = "bar";

  return function() {
    console.log(bar); // looks at closure. a live link back to bar.
  };
}

function bam() {
  foo()();
}

bam(); // "bar" (whatever the value of `bar` is)


// setTimeouts happen because of closure


function foo(){}
