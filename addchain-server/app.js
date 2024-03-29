const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const projectController = require('./controllers/projectcontroller');
const designController = require('./controllers/designcontroller');
const buildController = require('./controllers/buildcontroller');
const printController = require('./controllers/printcontroller');
const partController = require('./controllers/partcontroller');
const searchController = require('./controllers/searchcontroller');

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
  console.log("Adding cors header");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, OPTIONS");
  next();
});

app.use('/projects', projectController);
app.use('/designs', designController);
app.use('/builds', buildController);
app.use('/prints', printController);
app.use('/parts', partController);
app.use('/search', searchController);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});