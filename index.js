'use strict';

require('dotenv').config();
const { start } = require('./src/server.js');
const PORT = process.env.PORT;

start(PORT);
///compare!!!!!!!!!!