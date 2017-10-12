const express = require('express');
const router = express.Router();
const design = require('../database/designhandle');

router.get('/', (req, res) => {
  design.all
    .then(data => {
      res.json(data);
    })
    .catch(error =>{
      console.log("Error: ", error);
      res.status(500);
      res.send('');
    })
});

module.exports = router;