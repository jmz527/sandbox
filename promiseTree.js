// var promise = {
// 	isDone: false,
// 	doneHandler: null,
// 	done: function(f) {
// 		if (this.isDone) {
// 			f();
// 		} else {
// 			this.doneHandler = f;
// 		}
// 	},
// 	callDone: function() {
// 		if (this.doneHandler != null) {
// 			this.doneHandler();
// 		} else {
// 			this.isDone = true;
// 		}
// 	}
// }

// promise.done(recurse(0));


// function recurse(i) {
// 	console.log(i);

// 	i++;

// 	if (i<10)
// 		recurse(i);

// };

// // console.log(promise.doneHandler);

// // promise.callDone();

// // console.log(promise);


function recursiveLog(x, callback) {
    var recurse = function(y) {
        console.log(y);
        if (y < 3)
        	recurse(y + 1);

    }
    recurse(x);
    callback();
}

recursiveLog(0, function() { console.log('done'); });