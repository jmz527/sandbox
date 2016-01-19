// load the things we need
var express = require('express');
var app = express();
var path = require('path');
var requirejs = require('requirejs');

// allow app to be aware of these folders
app.use('/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/modules', express.static(path.join(__dirname, 'node_modules')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
	res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
	res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');