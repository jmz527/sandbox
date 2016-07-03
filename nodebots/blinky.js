var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var led2 = new five.Led(12);
  var led = new five.Led(11);
  var switcher = false;

  setInterval(function() {

  	switcher = (switcher === true) ? false : true ;

  	if (switcher) {
	  // "blink" the led in 500ms on-off phase periods
	  led.on();
	  led2.off();
  	} else {
  		led2.on();
  		led.off();
  	}

  }, 500);

});