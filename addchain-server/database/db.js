const pgp = require('pg-promise')();
const config = require('../config');
const cn = {
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password
};
const db = pgp(cn);
module.exports = db;