const db = require('./db');

exports.all = db.query('SELECT * FROM design');