#!/usr/bin/env node
//above line is for shebang
/*jshint esversion: 6 */
//Node command line//
'use strict';
const fs = require('fs');
const path = require('path'); //path module (node) to access pets.json database
//path.join -- add a forward slash after the dir;
const node = path.basename(process.argv[0]); //process.basename gives you the last word in the path
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];
const petsPath = path.join(__dirname, 'pets.json'); //__dirname is the dir that pet.js is in

//read
const doRead = function() {
  let index = process.argv[3];
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw (err);
      process.exit(1);
    }
    let pets = JSON.parse(data);
    if (pets[index]) {
      console.log(pets[index]);
    } else {
      console.log(pets);
    }
  });
};

//create
const doCreate = function() {
  let age = process.argv[3];
  let kind = process.argv[4];
  let name = process.argv[5];
  if (!age || !kind || !name) {
    console.error ('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  }
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if(err) {
      throw (err);
      process.exit(1);
    }
    let pets = JSON.parse(data); //convert data from string to array of obj
    let pet = {
      age: Number(age),
      kind: kind,
      name: name
    };
    pets.push(pet);
    let strPets = JSON.stringify(pets); //convert objPets from obj to string to writeFile
    //.writeFile function will write to pets.json
    //.writeFile is asynchronous because it takes a callback
    fs.writeFile(petsPath, strPets, function(writeErr) {
      if (writeErr) {
        throw (writeErr);
        process.exit(1);
      }
      console.log(pet);
    });
  });
};

//update
const doUpdate = function() {
  let index = process.argv[3];
  let age = process.argv[4];
  let kind = process.argv[5];
  let name = process.argv[6];
  if (index && age && kind && name) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
      if (err) {
        throw (err);
        // -- throw(err) special return, exit if no one catches -- shown in stack trace
        process.exit(1); //process.exit will exit the whole server -- not good in real life?
      }
      let pets = JSON.parse(data); //array of objects
      let pet = {
        age: Number(age),
        kind: kind,
        name: name
      }
      pets[index] = pet;
      let strPets = JSON.stringify(pets);
      fs.writeFile(petsPath, strPets, function(writeErr) {
        if (writeErr) {
          throw (writeErr);
        }
        console.log(pets[index]);
      })
    });
  } else {
      console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
      process.exit(1);
  }
};

//destroy
const doDestroy = function() {
  let index = process.argv[3];
  //node pets.js destroy index
  if(index) {
    fs.readFile(petsPath, 'utf8', function(err,data) {
      if(err) {
        throw(err);
        process.exit(1);
      }
      let pets = JSON.parse(data);
      //pet is a placeholder for pets[index] before destroying it
        //so that line 119 would still work
      let pet = pets[index];
      pets.splice(index, 1);
      let strPets = JSON.stringify(pets);
      fs.writeFile(petsPath, strPets, function(writeErr) {
        if(err) {
          throw(err);
          process.exit(1);
        }
        console.log(pet);
      });
    });
  } else {
    console.error(`Usage: ${node} ${file} destroy INDEX`);
    process.exit(1);
  }
};

//cmd
if (cmd === 'read') {
  doRead();
} else if (cmd === 'create') {
  doCreate();
} else if (cmd === 'update') {
  doUpdate();
} else if (cmd === 'destroy') {
  doDestroy();
} else { //throw error
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}
