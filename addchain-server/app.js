const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const design = require('./controllers/designcontroller');

app.use(bodyParser.json());


app.get('/', (req, res) =>{
  res.status(200);
  return res.end();
});
app.use((req, res, next) => {
  console.log(req.method, "request to", req.originalUrl);
  next();
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, OPTIONS");
  next();
});
app.use('/designs', design);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});