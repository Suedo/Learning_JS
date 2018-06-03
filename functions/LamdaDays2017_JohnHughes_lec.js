// video: https://www.youtube.com/watch?v=1qBHf8DrWR8
// this thing is theory with Haskell. So beware.
console.clear()
var log = (str) => console.log(str)

/* who needs integers 
This part shows how functions can be used as 
an alternative to primitive Integer type. */

// Define a number, ex: two, using increment function
var two = (f, x) => f(f(x))
var one = (f, x) => f(x)
var incr = x => x+1
log(two(incr,0))                            // 2

// adding two 'functional' numbers m and n
// at this point, this become difficult for me, because JS 
// isn't Haskell, and I have to (per my knowledge) use ints anyway
// even whn i'm trying to implement them with functions
// so, this stops here for me. But the idea is pretty good.
// the video has great ideas for functional programming in general.
// its just not desgined for a 'learn JS' audience
var add = (f,m,n) => {
  // apply f n times, then m times
  var acc = f(n)
  for(let i = 1; i < n; i++) 
    var acc = f()
}

var mul = (f,m,n) => {
  
}

log(add(one(incr,mul(incr,two(incr,0),two(incr,0))))) // something like this

// 