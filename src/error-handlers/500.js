'use strict';

const errorhandler = (error, req, res, next) => {
  res.status(500).send({
    error: 500,
    route: req.path,
    query: req.query,
    body: req.body,
    message: `server error: ${error.message}`,
  });
};


module.exports = errorhandler;
