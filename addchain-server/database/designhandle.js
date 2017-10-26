const db = require('./db');

exports.getDesignList = db.query('SELECT * FROM designs');
exports.getDesign = (id) => {return db.one('SELECT * FROM designs WHERE design_id = $1', id);};