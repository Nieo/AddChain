/*
If you want to use local configurations that is not pushed to git create a file called local.config.js.
Paste the following 3 lines into the file and add the local configuration parameters to the object.
const local = {
};
module.exports = local;
*/


const config = {
  database : 'addchain',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: null
};

try{
  const local = require('./local.config.js');
  if(local.database  !== undefined)config.database = local.database;
  if(local.host  !== undefined)config.host = local.host;
  if(local.port  !== undefined)config.port = local.port;
  if(local.user  !== undefined)config.user = local.user;
  if(local.password  !== undefined)config.password = local.password;
}catch (e ){
  console.log("WARNING missing local.config.js");
}

module.exports = config;