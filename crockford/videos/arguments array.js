// Upto ES5, arguments is treated as an objet and not an array, 
// so we have to convert it into an array before we can iterate through it

function sum1() {
	
	var i=0, total =0;

	for (var i = 0; i < arguments.length; i++) {
		total += arguments[i];
	}

	return total;

}

function sum2(){
	var myarr = Array.prototype.slice.call(arguments);

	/*
	reduce function needs an array.
	each turn loop, 'step' is one entry from the array, added to the accumulator,
	untill all array entries are taken care of
	*/
	return myarr.reduce(function(accumulator,step){ return accumulator + step; }, 0) // 0 is the initial value

}

function sum3(){
	
	var t = 0, a = Array.prototype.slice.call(arguments);
	for(var x in a){ // x is the key, a[x] the value
		t += a[x];
	}

	return t;
}


console.log(sum1(1,2,3,4));
console.log(sum2(1,2,3,4));
console.log(sum3(1,2,3,4));