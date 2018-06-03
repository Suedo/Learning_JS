var stooge = {
	"name" : "Henry",
	"age" : 25,
	"car" : "ford"
};

var stooge2 = Object.create(stooge);
stooge2.car = "mustang";
console.log(stooge2.car);

/*
	Delete property with no effect on proto chain.
	This will let the proto parent's 'car' shine through
*/

delete stooge2.car; 
console.log(stooge2.car); // ford 

delete stooge.car; 
console.log(stooge2.car); // undefined, as 'car' doesnt exist in the proto chain anymore