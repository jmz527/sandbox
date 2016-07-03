var fs = require('fs');

fs.exists('design_patterns.js', (exists) => { console.log(exists?'yup':'nope') });

fs.readFile('design_patterns.js','utf8', (err, data) => { console.log(err? err: data ) });

