'use strict';

const express = require('express');
const { clothesModel } = require('../models');
const router = express.Router();

router.get('/cItem', async (req, res, next) => {
  const orders = await clothesModel.findAll();
  res.status(200).send(orders);
});

router.get('/cItem/:id', async (req, res, next) => {
  const article = await clothesModel.findAll({where: {id: req.params.id}});
  res.status(200).send(article);
});

router.post('/cItem', async (req, res, next) => {
  const newCItem = await clothesModel.create(req.body);
  res.status(200).send(newCItem);
});

router.put('/cItem/:id', async (req, res, next) => {
  const retrievedCItem = await clothesModel.findOne({where: {id: req.params.id}});
  let updatedCItem = await retrievedCItem.update(req.body);
  res.status(200).send(updatedCItem);
});

router.delete('/cItem/:id', async (req, res, next) => {
  const deleteCItem = await clothesModel.destroy({ where: {id: req.params.id}});  //findbypk or id? my choice?
  res.status(204).json(deleteCItem);
});

module.exports = router;