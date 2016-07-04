var five = require("johnny-five");
var board = new five.Board();

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {
  console.log("Ready!");

  var led = new five.Led(13);
  led.blink(500);
});

// board.on("ready", function() {
//   var led = new five.Led(13);
//   led.on();


//   this.on("exit", function() {
//     led.off();
//   });
// });