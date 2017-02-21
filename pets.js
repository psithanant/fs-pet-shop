'use strict';

console.log('Usage: node pets.js [read | create | update | destroy]');
let fs = require('fs');
let path = require('path');
let guestsPath = path.join(__dirname, 'pets.json');
let cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    let parsed = JSON.parse(data)
    console.log(parsed);
  });
}
else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });
