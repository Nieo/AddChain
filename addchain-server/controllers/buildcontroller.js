const express = require('express');
const router = express.Router();
const Build = require('../database/buildhandle');

router.get('/', (req, res) => {
  const page = req.query.page !== undefined ? req.query.page : 0;
  Build.getBuildList(page)
    .then(data => {
      res.json(data);
    })
    .catch(error =>{
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
router.get('/:id', (req, res) => {
  Build.getBuild(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
router.post('/', (req, res) => {
  Build.createBuild(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
router.put('/:id', (req, res) => {
  let d = req.body;
  d.id = req.params.id;
  Build.updateBuild(d)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
router.delete('/:id', (req, res) => {
  Build.deleteBuild(req.params.id)
    .then(count => {
      res.status(200);
      res.json(count);
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
router.options('/:id', (req, res) => {
  res.end();
});

module.exports = router;