/*jshint esversion: 6 */
'use strict';

let fs = require('fs');
let path = require('path');
let guestsPath = path.join(__dirname, 'pets.json');
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
let cmd = process.argv[2];
if (cmd === 'read') {
  let ind = process.argv[3];
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if(err) {
      throw(err);
    }
    let pets = JSON.parse(data);
    if (pets[ind]) {
      console.log(pets[ind]);
    } else {
      console.log(pets);
    }
  });
} else if (cmd === 'create') {
    let age = process.argv[3];
    let kind = process.argv[4];
    let name = process.argv[5];
    if (process.argv.length !== 6) {
      console.error('Usage: node pets.js create AGE KIND NAME');
    } else {
      fs.readFile(guestsPath, 'utf8', function(readErr, data) {
        let pet = {
          age: age,
          kind: kind,
          name: name
        };
        let pets = JSON.parse(data);
        pets.push(pet);
        let parsedPet = JSON.stringify(pets);
          fs.writeFile(guestsPath, parsedPet, function(writeErr) {
            if (writeErr) {
              throw (writeErr);
            }
            console.log(pet);
          });
        });
      }
} else {
    console.log(`Usage: ${node} ${file} [read | create | update | destroy`);
    process.exit(1);
}