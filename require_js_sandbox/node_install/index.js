// load the things we need
var express = require('express');
var app = express();
var path = require('path');
var requirejs = require('requirejs');

// allow app to be aware of these folders
app.use('/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/modules', express.static(path.join(__dirname, 'node_modules')));

/**
 * The first JS file to be loaded. Takes care of setting up all of
 * the required paths
 */

 // Configure RequireJS
 requirejs.config({
 	baseUrl: '/js',
 	paths: {
 		// The libraries we use
 		jquery: [
 			'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
 			//If the CDN location fails, load from this location
 			'https://code.jquery.com/jquery-2.2.0.min.js'
 		],
 		bootstrap: [
 			'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
 			//If the CDN location fails, load from this location
 			'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min'
 		]
 	}
 });

// requirejs.config({
//     //Pass the top-level main.js/index.js require
//     //function to requirejs so that node modules
//     //are loaded relative to the top-level JS file.
//     nodeRequire: require
// });

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