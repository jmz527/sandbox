var pg = require('pg');

// instantiate a new client
// the client will read connection information from
// the same environment variables used by postgres cli tools
var client = new pg.Client();

// connect to our database
client.connect(function (err) {
  if (err) throw err;

  // execute a query on our database
  client.query('SELECT $1::text as name', ['brianc'], function (err, result) {
    if (err) throw err;

    // just print the result to the console
    console.log(result.rows[0]); // outputs: { name: 'brianc' }

    // disconnect the client
    client.end(function (err) {
      if (err) throw err;
    });
  });
});



// var conStringPri = 'postgres://' + username + ':' + password + '@' + host +
//     '/postgres';
// var conStringPost = 'postgres://' + username + ':' + password + '@' + host +
//     '/' + dbName;

// pg.connect(conStringPri, function(err, client, done) { // connect to postgres db
//     if (err)
//         console.log('Error while connecting: ' + err);
//     client.query('CREATE DATABASE ' + dbName, function(err) { // create user's db
//         if (err)
//             console.log('ignoring the error'); // ignore if the db is there
//         client.end(); // close the connection

//         // create a new connection to the new db
//         pg.connect(conStringPost, function(err, clientOrg, done) {
//             // create the table
//             clientOrg.query('CREATE TABLE IF NOT EXISTS ' + tableName + ' ' +
//                     '(...some sql...)';
//         });
//     });
// });






// var pgp = require("pg-promise")(/*options*/);
// var db = pgp("postgres://username:password@host:port/database");

// db.one("SELECT $1 AS value", 123)
//     .then(function (data) {
//         console.log("DATA:", data.value);
//     })
//     .catch(function (error) {
//         console.log("ERROR:", error);
//     });
