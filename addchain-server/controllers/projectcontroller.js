const express = require('express');
const router = express.Router();
const projectHandle = require('../database/projecthandle');

router.get('/', (req, res) => {
    const page = req.query.page !== undefined ? req.query.page : 0;
    projectHandle.getProjectList(page)
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
    Promise.all([projectHandle.getProject(req.params.id),
        projectHandle.getRelatedDesigns(req.params.id)])
        .then(data => {
            let project = data[0];
            project.relatedDesigns = data[1];
            res.json(project);
        })
        .catch(error => {
            console.log("Error: ", error);
            res.status(500);
            res.end();
        })
});
router.post('/', (req, res) => {
    projectHandle.createProject(req.body)
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
    projectHandle.updateProject(d)
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
    projectHandle.deleteProject(req.params.id)
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