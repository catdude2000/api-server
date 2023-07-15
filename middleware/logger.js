'use strict';

module.exports = (req, res, next) => {
  console.log(`Hello: ever expanding universe ${req.path}`);
  next();
};
