/*jshint esversion: 6 */
'use strict';
let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
let cmd = process.argv[2];
if (cmd === 'read') {
  let ind = process.argv[3];
  fs.readFile(petsPath, 'utf8', function(err, data) {
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
    if (!age || !kind || !name) {
      console.error('Usage: node pets.js create AGE KIND NAME');
      process.exit(1);
    }
    fs.readFile(petsPath, 'utf8', function(readErr, data) {
      let pet = {
        age: Number(age),
        kind: kind,
        name: name
      };
      let pets = JSON.parse(data);
      pets.push(pet);
      let parsedPet = JSON.stringify(pets);
      fs.writeFile(petsPath, parsedPet, function(writeErr) {
        if (writeErr) {
          throw (writeErr);
        }
        console.log(pet);
      });
    });
} else if (cmd === "update") {
    let ind = process.argv[3];
    let age = process.argv[4];
    let kind = process.argv[5];
    let name = process.argv[6];
    if (ind && age && kind && name) {
        fs.readFile(petsPath, 'utf8', function(err, data) {
            if (err) {
                throw err;
            }
            let pets = JSON.parse(data);
            pets.splice(ind, 0, makePet(age, kind, name));
            let petsJSON = JSON.stringify(pets);
            fs.writeFile(petsPath, petsJSON, function(writeErr) {
                if (writeErr) {
                    throw writeErr;
                }
                console.log(pets[ind]);
            });
        });
    } else {
        console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
        process.exit(1);
    }
} else {
    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    process.exit(1);
}
