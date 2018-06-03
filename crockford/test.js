var flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: 14-55,
		city: "Los Angeles"
	}
};

var a = flight ;
var b = flight ;

flight.boss = "none";

console.log(typeof flight.boss);

// console.log(JSON.stringify(b,null,2));
// console.log(flight);
