const express = require('express');
const app = express();
const design = require('./controllers/desgincontroller');

app.get('/', function (req, res) {
  res.json({hello: "World"})
});

app.use('/designs', design);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});