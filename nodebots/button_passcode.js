var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(11);
  var button1 = new five.Button(2);
  var button2 = new five.Button(4);

  var pwArr = [1, 2, 1, 2];
  // var userArr = pwArr;
  // var userArr = [1, 2, 1, 2];
  var userArr = [];


  button1.on("press", function() {

    // led.on();
    userArr.push(1);
    console.log("button1 | userArr: " + userArr + " | pwArr: " + pwArr);
  });

  button2.on("press", function() {

    // led.on();
    userArr.push(2);
    console.log("button2 | userArr: " + userArr + " | pwArr: " + pwArr);
  });



  button1.on("release", buttonRelease);
  button2.on("release", buttonRelease);

  function buttonRelease() {


    if ((userArr + "") == (pwArr + "")) {
      console.log('success!!!');
      led.on();
    } else {
      console.log(typeof userArr);
      console.log(typeof pwArr);
      // console.error(userArr === pwArr);
      // console.error(userArr == pwArr);
      console.error("error | userArr: " + userArr + " | pwArr: " + pwArr);
    }
  };




  // button1.on("press", function() {

  //   // led.on();
  //   userArr.push(1);
  //   console.log("1 | " + userArr);
  // });

  // button1.on("hold", function() {
  //   led.blink(50);
  //   userArr = [];
  // });

  // button1.on("release", function() {
  //   // led.stop().off();

  //   if (userArr == pwArr) {
  //     led.on();
  //   }
  // });

  // button2.on("press", function() {

  //   // led.on();
  //   userArr.push(2);
  //   console.log("2 | " + userArr);
  // });

  // button2.on("hold", function() {
  //   led.blink(50);
  //   userArr = [];
  // });

  // button2.on("release", function() {
  //   // led.stop().off();

  //   console.log('hit | ' + userArr);

  //   if (userArr == pwArr) {
  //     led.on();
  //   }
  // });
});