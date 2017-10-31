const express = require('express');
const router = express.Router();
const design = require('../database/designhandle');

router.get('/', (req, res) => {
  const page = req.query.page !== undefined ? req.query.page : 0;
  design.getDesignList(page)
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
  design.getDesign(req.params.id)
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
  design.createDesign(req.body)
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
  design.updateDesign(req.body)
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
  design.deleteDesign(req.params.id)
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

module.exports = router;