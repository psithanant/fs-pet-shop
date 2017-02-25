/*jshint esversion: 6 */
let fs = require('fs');
let path = require('path');
let express = require('express');
let petsPath = path.join(__dirname, 'pets.json')
let app = express();
let port = process.env.PORT || 8000;
let morgan = require('morgan');
app.use(morgan('short'));
let bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.disable('x-powered-by');

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, function(err, petsJSON) {
    if (err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, function(err, petsJSON) {
    if (err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }
    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
      res.set('Content-Type', 'text/plain');
    }
    res.send(pets[id]);
  });
});

app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsJSON);
    console.log(req.body);
    let newPetName = req.body.name;
    let newPetAge = req.body.age;
    let newPetKind = req.body.kind;
    let pet = {
      age: newPetAge,
      kind: newPetKind,
      name: newPetName
    }
    // console.log(pet);
    if (!req.body.name || !req.body.age || !req.body.kind) {
      return res.sendStatus(400);
    }
    pets.push(pet);
    let newPetsJSON = JSON.stringify(pets);
    fs.writeFile(petsPath, newPetsJSON, function(err) {
      if (err) {
        console.error(err)
        return res.sendStatus(500);
      }
      res.set('Content-Type', 'application/json');
      res.send(pet);

    });
  });
});

app.patch('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsJSON);
    let id = Number.parseInt(req.params.id);
    for(let key in req.body) {
      pets[id][key] = req.body[key];
    }
    let newPetsJSON = JSON.stringify(pets);
    fs.writeFile(petsPath, newPetsJSON, function(err) {
      if (err) {
        console.error(err)
        return res.sendStatus(500);
      }
      res.set('Content-Type', 'application/json');
      //set respond body
      res.send(pets[id]);
    });
  });
});

app.delete('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    //1. readFile see petsJSON as string
    if(err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }
    //2. parse the string back to object type
    let pets = JSON.parse(petsJSON);
    let id = Number.parseInt(req.params.id);
    let pet = pets[id];
    pets.splice(id, 1);
    let newPetsJSON = JSON.stringify(pets);
    //3. Then stringify it back to writeFile
    fs.writeFile(petsPath, newPetsJSON, function(err) {
      if (err) {
        console.err(err);
        return res.sendStatus(500);
      }
      res.set('Content-Type', 'application/json');
      //set respond body
      res.send(pet);
    });
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
  res.set('Content-Type', 'text/plain');
})

app.listen(port, function() {
  console.log('Listening on port', port);
})

module.exports = app;
