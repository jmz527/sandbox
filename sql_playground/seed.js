
var sqlite3 = require('sqlite3').verbose(),
    fs = require("fs"),
    db = new sqlite3.Database('data.db');

if (fs.existsSync('data.json')) {
  var data, db, assets=[], points=[], duplicateEntries = 0, invalidEntries = 0;
      data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
      // console.log(data.length + ' objects within JSON array.');
      // console.log(data.assets);

      newAsset(data.assets);

      // console.log(data.assets.points);
      // console.log(data.assets.children);



  // Assets
  function newAsset(arr) {
    arr.forEach(function(asset) {
      // console.log(asset);

      // assets.push(asset);



      if (asset.points.length>0) {
        newPoint(asset.points);
      }

      if (asset.children.length>0) {
        newAsset(asset.children);
      }

    });
  }

  // Points
  function newPoint(arr) {
    arr.forEach(function(point) {
      // console.log(point);


      points.push(point);
    });
  }

  // console.log(assets);
  // console.log(points);

}






// var pg = require('pg');

// // instantiate a new client
// // the client will read connection information from
// // the same environment variables used by postgres cli tools
// var client = new pg.Client();

// // connect to our database
// client.connect(function (err) {
//   if (err) throw err;

//   // execute a query on our database
//   client.query('SELECT $1::text as name', ['brianc'], function (err, result) {
//     if (err) throw err;

//     // just print the result to the console
//     console.log(result.rows[0]); // outputs: { name: 'brianc' }

//     // disconnect the client
//     client.end(function (err) {
//       if (err) throw err;
//     });
//   });
// });



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
