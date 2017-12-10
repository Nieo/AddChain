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
      let designs = [];
      for (let i = 0, n = 0; i < req.body.relatedDesigns.length; i++, n++) {
        let design = req.body.relatedDesigns[i];
        for (let j = 0; j < design.copies; j++, n++) {
          designs.push({design_id: design.design_id, part_number: n});
        }
      }
      let createRelated = [];
      for (let design of designs) {
        createRelated.push(buildHandle.createRelatedDesign(data.build_id, design.design_id, design.part_number));
      }
      return Promise.all(createRelated).then(_ => {
        res.json(data);
      });
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
      return buildHandle.deleteRelatedDesigns(d.id).then(_ => {
        let designs = [];
        for (let i = 0, n = 0; i < req.body.relatedDesigns.length; i++, n++) {
          let design = req.body.relatedDesigns[i];
          for (let j = 0; j < design.copies; j++, n++) {
            designs.push({design_id: design.design_id, part_number: n});
          }
        }
        let createRelated = [];
        for (let design of designs) {
          createRelated.push(buildHandle.createRelatedDesign(data.build_id, design.design_id, design.part_number));
        }
        return Promise.all(createRelated).then(_ => {
          res.json(data);
        });}
      );
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
router.delete('/:id', (req, res) => {
  buildHandle.deleteRelatedDesigns(req.params.id).then(_ => {
    return buildHandle.deleteBuild(req.params.id)
      .then(count => {
        res.status(200);
        res.json(count);
      });
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