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
 			'https://code.jquery.com/jquery-2.2.0.min'
 		],
 		bootstrap: [
 			'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
 			//If the CDN location fails, load from this location
 			'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min'
 		]
 	}
 });