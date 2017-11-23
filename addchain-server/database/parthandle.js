const db = require('./db');

exports.getPart = (id) => {return db.one('SELECT * FROM parts WHERE part_id = $1', id);};
exports.getPartIfExists = (id) => db.oneOrNone('SELECT * FROM parts WHERE part_id = $1', id);
exports.getPartList = (page) => {return db.any('SELECT * FROM parts LIMIT 100 OFFSET $1',[page]);};
exports.getRelatedPostProcesses = (id) => {return db.any('SELECT refinements.post_process_id, post_processes.name, count(refinements.post_process_id)  ' +
    'FROM refinements INNER JOIN post_processes ON refinements.post_process_id = post_processes.post_process_id WHERE refinements.part_id=$1 GROUP BY refinements.post_process_id, post_processes.name',[id])};
exports.createPart = (part) => {return db.one('INSERT INTO parts (part_number, comment) VALUES ($1,$2) RETURNING *',[part.part_number,part.comment]);};
exports.deletePart = (id) => {return db.result('DELETE FROM parts WHERE part_id=$1',[id],r=>r.rowCount);};
exports.updatePart = (part) => {return db.one('UPDATE parts SET part_number=$2, comment=$3 WHERE part_id=$1 RETURNING *',[part.id, part.part_number, part.comment]);};

exports.getRelatedPrints = (id) => {
  return db.any('SELECT prepares.slm-id, count(prepares.slm-id) as "copies", prints.slm-id' +
  ' FROM prepares' +
  ' INNER JOIN prints ON prepares.slm_id = prints.slm_id' +
  ' WHERE slm_id=$1' +
  ' GROUP BY prepares.slm_id, prints.slm_id',[id]);
};