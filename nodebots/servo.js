var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create a new `servo` hardware instance.
  var servo = new five.Servo.Continuous(10);

  // Inject the `servo` hardware into
  // the Repl instance's context;
  // allows direct command line access
  this.repl.inject({
    servo: servo
  });
});