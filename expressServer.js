'use strict';

let fs = require('fs');
let path = require('path');
let express = require('express');
let guestsPath = path.join(__dirname, 'pets.json')
let app = express();
let port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/pets', function(req, res) {
  fs.readFile(guestsPath, function(err, petsJSON) {
    if (err) {
      console.err(err.stack);
      return res.sendStatus(200);
    }
    let pets = JSON.parse(petsJSON);
    res.send(pets);
    return(pets);
  });
});

app.get('/pets/0', function(req, res) {
  fs.readFile(guestsPath, function(err, petsJSON) {
    if (err) {
      console.err(err.stack);
      return res.sendStatus(200);
    }
    let pets = JSON.parse(petsJSON);
    res.send(pets[0]);
    return(pets[0]);
  });
});

app.get('/pets/1', function(req, res) {
  fs.readFile(guestsPath, function(err, petsJSON) {
    if (err) {
      console.err(err.stack);
      return res.sendStatus(200);
    }
    let pets = JSON.parse(petsJSON);
    res.send(pets[1]);
    return(pets[1]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
})

app.listen(port, function() {
  console.log('Listening on port', port);
})

module.exports = app;
