const db = require('./db');

exports.getDesignList = (page) => {return db.any('SELECT * FROM designs LIMIT 100 OFFSET $1', [page]);};
exports.getDesign = (id) => {return db.one('SELECT * FROM designs WHERE design_id = $1', id);};
exports.createDesign = (design) => {return db.one('INSERT INTO designs (name, description) VALUES ($1,$2) RETURNING *', [design.name, design.description]);};
exports.updateDesign = (design) => {return db.one('UPDATE designs SET name=$2, description=$3 WHERE design_id=$1 RETURNING *', [design.id, design.name, design.description]);};
exports.deleteDesign = (id) => {return db.result('DELETE FROM designs WHERE design_id=$1', [id], r => r.rowCount);};
exports.getRelatedBuilds = (id) => {return db.any('SELECT prepares.build_id, count(prepares.build_id) FROM prepares WHERE design_id=$1 GROUP BY prepares.build_id',[id])};