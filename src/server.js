'use strict';

const express = require('express');
const cors = require('cors');
const handle500 = require('./error-handlers/500');
const handle404 = require('./error-handlers/404');
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(foodRouter);
app.use(clothesRouter);
app.get('/', (req, res, next) => {
  res.status(200).send('proof: LIFE!');
});

app.use('*', handle404);
app.use(handle500);

const start = (port) => app.listen (port, () => console.log('listening on port:', port));

module.exports = { start, app };