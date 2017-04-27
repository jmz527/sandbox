let str = "aabbcca"; // result -> "a2b2c2a1";
// let str = "Loremipsumdolorsitamet,consecteturadipisicingelit.Architectomolestiaenihilea,suntnisiminimaillodolorem,autaspernaturrempraesentium!Inventoreaspernaturadipisciestcorruptidelectusveroquasiaut";
// let str = "llllaaaadddddkkkkddddooosskkddddddddddd";

function countChars(str) {
	let result = "", count = 1;

	for (var i = 0; i < str.length; i++) {

	  if (str[i] == str[i + 1]) {
	    count++;
	  } else if (str[i] != str[i + 1]) {
	    result += str[i]+count;
	    count = 1;
	  }

	}

	return result
}


console.log(countChars(str));




// let results = "";

// for (var i = 0; i <= 100; i++) {
// 	i%3 || (results+='fizz ');
// 	i%5 || (results+='buzz ');
// 	!(i%3 && i%5) || (results+=(i + ' '));
// }

// console.log(results);