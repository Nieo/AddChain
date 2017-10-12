# AddChain
Software evolution project group 4

## Install instructions
1. Install node.js
1. Install `npm
1. run `npm install -g @angular/cli`
1. cd to `addchain-app`
1. run `npm install`
1. cd to `addchain-server`
1. run `npm install`
1. create the file `local.config.js` in `addchain-server/`
1. read instructions in `config.js` about `local.config.js`
1. create the database from `/addchain-server/database/setup.sql`
1. optional. Fill the database with data from `/addchain-server/database/testdata.sql`

## Run 
Server: in `addchain-server/` run `node app.js`  
Client: in `addchain-app run/` run `ng-serve`