console.clear()

/*
  Closure, let and var
  part 1: we use var >> it's global, and value is overwritten each time
  part 2: we use let >> it's local, and each iteration has closure over the value that was held at that iteration
*/


// --------------------- Part 1 ---------------------------------

for(var i = 1; i < 5; i++){     // i is global here
  
  /* i here will refer to global value at time of execution
     thus, this loop will always show i = 4, as by the time the first callback fires,
     the loop has already completed iteration, and i = 4 */
  
  setTimeout(function(){console.log("global i : " + i);} , i*1000 ); 
  // console.log("xx : " + i ); 
  
}

console.log("global done")
console.log("global final i : " + i) // i = 5



// --------------------- Part 2 ---------------------------------

for(let i = 1; i < 5; i++){
  
  /*  When setTimeout gets called, the closure over `i` will maintain 
      the iteration-specific value, because `i` is local to the scope of `for`,
      and setTimeout is not getting an overwritten final value  of the variable */
  
  setTimeout(function(){console.log("local  i : " + i);} , i*1000 );
  // console.log("xx : " + i );
  
}

console.log("local done")


------------------------------------------------------------------

/* 

Output:

Console was cleared.
global done
global final i : 5
local done
global i : 5
local  i : 1
global i : 5
local  i : 2
global i : 5
local  i : 3
global i : 5
local  i : 4

*/
