const express = require('express');
const router = express.Router();
const design = require('../database/designhandle');

router.get('/', (req, res) => {
  design.getDesignList
    .then(data => {
      res.json(data);
    })
    .catch(error =>{
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
router.get('/:id', (req, res) =>{
    design.getDesign(req.params.id)
    .then(data => {
        res.json(data);
    })
    .catch(error =>{
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
})

module.exports = router;