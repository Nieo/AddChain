const express = require('express');
const router = express.Router();
const printHandle = require('../database/printhandle');
const designHandle = require('../database/designhandle');
const buildHandle = require('../database/buildhandle');
const partHandle = require('../database/parthandle');
const projectHandle = require('../database/projecthandle');


router.get('/:id', (req, res) => {
  const regex = /^\d+$/;
  let isNumerical = regex.test(req.params.id);
  console.log('Search: "' + req.params.id + '", numerical: ' + isNumerical);
  let queries = [
    isNumerical ? buildHandle.getBuildIfExists(req.params.id) : Promise.resolve(null),
    isNumerical ? designHandle.getDesignIfExists(req.params.id) : Promise.resolve(null),
    isNumerical ? printHandle.getPrintIfExists(req.params.id) : Promise.resolve(null),
    isNumerical ? buildHandle.getRelatedDesigns(req.params.id) : Promise.resolve(null),
    isNumerical ? partHandle.getPartIfExists(req.params.id) : Promise.resolve(null),
    isNumerical ? partHandle.getRelatedPostProcesses(req.params.id) : Promise.resolve(null),
    projectHandle.getProjectIfExists(req.params.id)
  ];

  Promise.all(queries)
    .then(data => {
        let results = {
            'projects': data[6] ? [data[6]] : [],
            'builds': data[0] ? [data[0]] : [],
            'designs': data[1] ? [data[1]] : [],
            'prints': data[2] ? [data[2]] : [],
            'parts': data[4] ? [data[4]] : []
        };
        if (results.builds.length > 0) {
          results.builds[0].relatedDesigns = data[3];
        }
        if (results.parts.length > 0) {
          results.parts[0].relatedPostProcesses = data[5];
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