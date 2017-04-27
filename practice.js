// ======================================================================================== //





// ======================================================================================== //
// function toCamelCase(str){

// 	// split the string by the deliminator
// 	var arr = str.split(/-|_/);

// 	// loop over the array, capitalizing each word except the first
// 	for (var i = 1; i < arr.length; i++) {
// 		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
// 	}

// 	// turn it bck into a string & return it
// 	var result = arr.join('');
// 	// console.log(result);
// 	return result;

// }


// // returns "theStealthWarrior"
// toCamelCase("the-stealth-warrior") 

// // returns "TheStealthWarrior"
// toCamelCase("The_Stealth_Warrior")




// ======================================================================================== //
// function validParentheses(parens){
// 	// Split into array
// 	var parensArr, openCount = 0, closeCount = 0, meter = 0, first = null, last = null;
// 		parensArr = parens.split("");

// 	// Check first and last
// 	first = (parensArr[0]=="(");
// 	// console.log("parensArr[0]:"+ parensArr[0]);

// 	last = (parensArr[parensArr.length-1]==")");
// 	// console.log("parensArr[-1]:"+ parensArr[parensArr.length-1]);


// 	console.log("first: "+first, "last: "+last);

// 	// Loop over array, counting parens
// 	for (var i = 0; i < parensArr.length; i++) {
// 		if (parensArr[i]=="(") {
// 			openCount++;
// 			meter++;
// 		} else if (parensArr[i]==")") {
// 			closeCount++;
// 			meter--;
// 		}

// 		// console.log(parens);
// 		// console.log("openCount: "+openCount, "closeCount: "+closeCount, "meter: "+meter);

// 	}

// 	// If parens match, return true
// 	if (first && last && openCount==closeCount && meter==0) {
// 		return true
// 	} else {
// 		return false
// 	}

// }

// console.log(validParentheses("()"));
// console.log(validParentheses("())"));