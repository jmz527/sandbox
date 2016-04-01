var Engine = { //main Engine object

	//VARIABLES
	//--------------------------------------------------------------------------/
	Player: { //player object
		Coins: 0, //how many coins player has
		PerClick: 1, //how many coins per click
		PerIncrement: 0, //how many coins per increment
		Increment: 2000 //2sec increment
	},
	Canvas: { //canvas object
		Element: null, //canvas element
		Context: null //will be 2d context
	},


	//FUNCTIONS
	//--------------------------------------------------------------------------/
	Init: function() { //initial
		Engine.Canvas = document.createElement('canvas');
		Engine.Canvas.id = "display";
		Engine.Canvas.width = 800;
		Engine.Canvas.height = 600;
		$('body').append(Engine.Canvas);

		Engine.Canvas.Context = Engine.Canvas.getContext('2d');
		Engine.GameLoop();
	},

	GameRunning: null,
	Update: function() {
		Engine.Draw();
	},
	Draw: function() {
		Engine.Canvas.Context.clearRect(0, 0, Engine.Canvas.width, Engine.Canvas.height);
		Engine.Rect(50, 64, 128, 32, "red");
		Engine.GameLoop();
	},
	GameLoop: function() {
		Engine.GameRunning = setTimeout(function() {
			requestAnimFrame(Engine.Update, Engine.Canvas);
		}, 10);
	},

	Rect: function(x, y, w, h, col) {
		if (col.length > 0) {
			Engine.Canvas.Context.fillStyle = col;
		}
		Engine.Canvas.Context.fillRect(x, y, w, h);
	}
};

window.requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
		function(callback, element) {
			fpsLoop = window.setTimeout(callback, 1000 / 60);
		};
}());

window.onload = Engine.Init(); // Engine stars on load