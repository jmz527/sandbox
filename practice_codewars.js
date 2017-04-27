function fiveDigits(digits){
  var str = digits.toString(), dL = 5, arr = [], result;
  
  for (var i = 0; i < str.length; i++) {
  	// console.log(str[i])
  	// console.log(str.slice(i, i+dL))
  	arr.push(parseInt(str.slice(i, i+dL)))
  }

  result = arr.reduce(function(acc, val) {
  	return (acc < val)?val:acc;
  })
  
  // console.log(arr)
  // console.log(result)

  return result;
}

fiveDigits(283910)





// ======================================================================================== //
// var isPP = function(n){
// 	var maxB = Math.floor(Math.log2(n)+1);
// 	var maxA = Math.floor(Math.sqrt(n));

// 	for(var b = 2; b <= maxB; b++) {
// 	    for(var a = 1; a <= maxA; a++) {
// 	      if (Math.pow(a, b) === n) {
// 	        return [a, b];
// 	      }
// 	    }
// 	}
// 	return null;
// }

// console.log(isPP(4)) // [2,2], "4 = 2^2"
// console.log(isPP(9)) // [3,2], "9 = 3^2"


// ======================================================================================== //
// function anagrams(word, words) {
// 	var wordDic, wordDicStr, idxArr = [];

// 	// turn the word into a dict
// 	wordDic = wordToDict(word);
// 	wordDicStr = JSON.stringify(wordDic);
// 	// console.log(wordDic);
// 	// console.log(wordDicStr);

// 	// loop over the arr, turning words into dicts
// 	for (var i = 0; i < words.length; i++) {
		
// 		// Check if they match, if so save the index
// 		if (wordDicStr == JSON.stringify(wordToDict(words[i])))
// 			idxArr.push(i);

// 	}

// 	// return an array of the matching words
// 	var result = idxArr.map(function(idx) { return words[idx] });
// 	// console.log(result);
// 	// console.log("idxArr: "+idxArr);

// 	return result;

// 	// function turns a str into a dict of letter counts
// 	function wordToDict(wrd) {
// 		var wrdArr, dict = {};
// 			wrdArr = wrd.split("");

// 		for (var i = 0; i < wrdArr.length; i++) {
// 			if (dict.hasOwnProperty(wrdArr[i])) {
// 				dict[wrdArr[i]] = dict[wrdArr[i]] + 1;
// 			} else {
// 				dict[wrdArr[i]] = 1;
// 			}
// 		}

// 		// console.log("wrdArr: "+wrdArr, "dict: "+dict);
// 		return sortObject(dict);
// 	}

// 	// function sorts obj properties within obj
// 	function sortObject(o) {
// 	    var sorted = {},
// 	    key, a = [];

// 	    for (key in o) {
// 	        if (o.hasOwnProperty(key)) {
// 	            a.push(key);
// 	        }
// 	    }

// 	    a.sort();

// 	    for (key = 0; key < a.length; key++) {
// 	        sorted[a[key]] = o[a[key]];
// 	    }
// 	    return sorted;
// 	}

// }

// anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) // => ['aabb', 'bbaa']

// anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) // => ['carer', 'racer']

// anagrams('laser', ['lazing', 'lazy',  'lacer']) // => []



// ======================================================================================== //
// function toCamelCase(str){

// 	// split the string by the deliminator
	// var arr = str.split(/-|_/);

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