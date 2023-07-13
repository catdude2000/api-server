'use strict';

require('dotenv').config();
const { sequelizeDatabase } = require('./src/models');
const { start } = require('./src/server.js');
const PORT = process.env.PORT;

sequelizeDatabase.sync()
  .then(() => {
    console.log('Successful Connection');
    start(PORT);
  })
  .catch(e => console.error(e));


// start(PORT);
///compare!!!!!!!!!!