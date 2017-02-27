const express = require('express');
let port = process.env.PORT || 9001;
let app = express();


app.use(
  express.static('.')
);

app.listen(port, function() {
  console.log('Listening on port', port);
})
