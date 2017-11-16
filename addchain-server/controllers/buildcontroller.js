const express = require('express');
const router = express.Router();
const buildHandle = require('../database/buildhandle');

router.get('/', (req, res) => {
  const page = req.query.page !== undefined ? req.query.page : 0;
  buildHandle.getBuildList(page)
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
  Promise.all([buildHandle.getBuild(req.params.id),
    buildHandle.getRelatedDesigns(req.params.id),
    buildHandle.getRelatedPrints(req.params.id)])
    .then(data => {
      let build = data[0];
      build.relatedDesigns = data[1];
      build.relatedPrints = data[2];
      res.json(build);
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
router.post('/', (req, res) => {
  buildHandle.createBuild(req.body)
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
  buildHandle.updateBuild(d)
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
  buildHandle.deleteBuild(req.params.id)
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