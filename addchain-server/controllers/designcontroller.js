const express = require('express');
const router = express.Router();
const designHandle = require('../database/designhandle');

router.get('/', (req, res) => {
  const page = req.query.page !== undefined ? req.query.page : 0;
  designHandle.getDesignList(page)
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
    Promise.all([designHandle.getDesign(req.params.id),
        designHandle.getRelatedBuilds(req.params.id),
        designHandle.getRelatedProject(req.params.id)])
    .then(values => {
      let design = values[0];
      design.relatedBuilds = values[1];
      design.relatedProject = values[2];
      console.log(design);
      res.json(design);
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    });
});
router.post('/', (req, res) => {
  designHandle.createDesign(req.body)
  .then(design => {
    return designHandle.createRelatedProject(design.design_id, req.body.relatedProject[0].project_id)
      .then(_ => {
        res.json(design);
      });
  })
  .catch(error => {
    console.log("Error: ", error);
    res.status(500);
    res.end();
  });
});
router.put('/:id', (req, res) => {
  let d = req.body;
  d.id = req.params.id;
  designHandle.updateDesign(d)
    .then(data => {
      return designHandle.updateRelatedProject(d.id, d.relatedProject[0].project_id)
        .then(_ => {
          res.json(data);
        });
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    })
});
router.delete('/:id', (req, res) => {
  designHandle.deleteRelatedProject(req.params.id)
  .then(_ => {
    return designHandle.deleteDesign(req.params.id)
      .then(count => {
        res.status(200);
        res.json(count);
      });})
    .catch(error => {
      console.log("Error: ", error);
      res.status(500);
      res.end();
    });
});
router.options('/:id', (req, res) => {
  res.end();
});

module.exports = router;