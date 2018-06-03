var strFunc = (val,fn) => {
  var chars = val.split("")
  return chars.map( char => String.fromCharCode(fn(char.charCodeAt(0)))).join("")
}

var op = strFunc("ABC", x => x +1 )

console.log(op)