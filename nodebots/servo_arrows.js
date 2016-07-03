// var five = require("johnny-five");
// var board = new five.Board();

// board.on("ready", function() {

// 	var stdin = process.openStdin(); 
// 	require('tty').setRawMode(true);    

// 	stdin.on('keypress', function (chunk, key) {
// 	  // process.stdout.write('Get Chunk: ' + chunk + '\n');

// 	  console.log('Get Chunk: ' + chunk + '\n');


// 	  if (key && key.ctrl && key.name == 'c') process.exit();
// 	});



// 	var servo = new five.Servo(11);

// 	this.repl.inject({
// 	servo: servo
// 	});



// });