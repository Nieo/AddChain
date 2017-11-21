const express = require('express');
const router = express.Router();
const partHandle = require('../database/parthandle');

router.get('/', (req, res) => {
    const page = req.query.page !== undefined ? req.query.page : 0;
    partHandle.getPartList(page)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log("Error: ", error);
            res.status(500);
            res.end();
        })
});

router.get('/:id', (req, res) => {
    Promise.all([
        partHandle.getPart(req.params.id),
        partHandle.getRelatedPostProcesses(req.params.id)
    ])
        .then(values => {
            let part = values[0];
            part.relatedPostProcesses = values[1];
            console.log(part);
            res.json(part);
        })
        .catch(error => {
            console.log("Error: ", error);
            res.status(500);
            res.end();
        })
});
router.post('/', (req, res) => {
    partHandle.createPart(req.body)
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
    partHandle.updatePart(d)
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
    partHandle.deletePart(req.params.id)
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
router.options('/:id',(req,res) => {
    res.end();
});

module.exports = router;