const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const design = require('./controllers/designcontroller');

app.use(bodyParser.json());


app.get('/', (req, res) =>{
  res.status(200);
  return res.end();
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/designs', design);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});