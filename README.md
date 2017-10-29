# AddChain
Software evolution project group 4

## Install instructions
1. Install node.js
1. Install `npm
1. Install PostgreSQL
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

## How to create frontend component
1. Go to addchain\addchain-app\src\app\components and use "ng generate component [name of component]"

## How to create frontend service
1. Go to addchain\addchain-app\src\app\services and use "ng generate service [name of service]"
2. Go to addchain\addchain-app\src\app
3. Open the app.module.ts file
4. Add the service to the providers 

## How to create frontend model
1.Go to addchain\addchain-app\src\app\models and use "ng generate class [name]"