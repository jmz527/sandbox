function firstNonRepeat(str) {
	var arr, dict = {}, result;

	// split string into arr
	arr = str.split('');

	// loop over arr making a dictionary out of the letters
	for (var i = 0; i < arr.length; i++) {

		if (dict.hasOwnProperty(arr[i])) {
			dict[arr[i]] = dict[arr[i]] + 1;
		} else {
			dict[arr[i]] = 1;
		}

	}

	// console.log(dict);

	// loop over arr again, checking for the first letter that occurs only once
	for (var i = 0; i < arr.length; i++) {
		if (dict[arr[i]]==1) {
			result = arr[i];
			break;
		}
	}

	// console.log(result);
	return result;
}

// firstNonRepeat("Field notes, page memo book durable materials");