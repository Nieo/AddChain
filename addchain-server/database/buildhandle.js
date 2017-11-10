const db = require('./db');

exports.getBuildList = (page) => {return db.any('SELECT * FROM builds LIMIT 100 OFFSET $1', [page]);};
exports.getBuild = (id) => {return db.one('SELECT * FROM builds WHERE build_id = $1', id);};
exports.createBuild = (build) => {return db.one('INSERT INTO builds (material, comment) VALUES ($1,$2) RETURNING *', [build.material, build.comment]);};
exports.updateBuild = (build) => {return db.one('UPDATE builds SET material=$2, comment=$3 WHERE build_id=$1 RETURNING *', [build.id, build.material, build.comment]);};
exports.deleteBuild = (id) => {return db.result('DELETE FROM builds WHERE build_id=$1', [id], r => r.rowCount);};