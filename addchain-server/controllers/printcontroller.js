const express = require('express');
const router = express.Router();
const Print = require('../database/printhandle');

router.get('/', (req, res) => {
  const page = req.query.page !== undefined ? req.query.page : 0;
  Print.getPrintList(page)
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
  Promise.all([Print.getPrint(req.params.id), Print.getRelatedParts(req.params.id)])
    .then(data => {
      let print = data[0];
      print.relatedParts = data[1];
      res.json(print);
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
router.post('/', (req, res) => {
  Print.createPrint(req.body)
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
  Print.updatePrint(d)
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
  Print.deletePrint(req.params.id)
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