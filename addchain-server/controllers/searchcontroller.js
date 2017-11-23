const express = require('express');
const router = express.Router();
const printHandle = require('../database/printhandle');
const designHandle = require('../database/designhandle');
const buildHandle = require('../database/buildhandle');


router.get('/:id', (req, res) => {
  const regex = /\d+/;
  if(!regex.test(req.params.id)) {
    res.json({'builds':[],'designs':[],'prints':[]});
    return;
  }
  Promise.all([buildHandle.getBuildIfExists(req.params.id),
    designHandle.getDesignIfExists(req.params.id),
    printHandle.getPrintIfExists(req.params.id),
    buildHandle.getRelatedDesigns(req.params.id)])
    .then(data => {
        let results = {
            'builds': data[0] ? [data[0]] : [],
            'designs': data[1] ? [data[1]] : [],
            'prints': data[2] ? [data[2]] : [],
        };
        if (results.builds.length > 0) {
          results.builds[0].relatedDesigns = data[3];
        }
        console.log(results);
        res.json(results);
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
module.exports = router;