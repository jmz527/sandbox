var sqlite3 = require('sqlite3').verbose(),
    fs = require("fs"),
    db = new sqlite3.Database('playground.db');

if (fs.existsSync('bioprint-data.json')) {
  var data, db, users=[], prints=[], duplicateEntries = 0, invalidEntries = 0;;
      data = JSON.parse(fs.readFileSync('bioprint-data.json', 'utf8'));
      console.log(data.length + ' objects within JSON array.');

}