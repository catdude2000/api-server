'use strict';

const express = require('express');
const { clothesModel } = require('../models');
const router = express.Router();


// declaring functions !Need middleware!
//get all 
router.get('/cItem', async (req, res, next) => {
  const orders = await clothesModel.findAll();
  res.status(200).send(orders);
});

//get one
router.get('/cItem/:id', async (req, res, next) => {
  const article = await clothesModel.findAll({where: {id: req.params.id}});
  res.status(200).send(article);
});

//create
router.post('/cItem', async (req, res, next) => {
  const newCItem = await clothesModel.create(req.body);
  res.status(200).send(newCItem);
});

//update one
router.put('cItem/:id', async (req, res, next) => {
  const updateCItem = await clothesModel.findAll({where: {id: req.params.id}});
  res.status(200).send(updateCItem);
});

//delete one
router.delete('/cItem/:id', async (req, res, next) => {
  const deleteCItem = await clothesModel.destroy({ where: {id: req.params.id}});  //findbypk or id? my choice?
  res.status(204).json(deleteCItem);
});

module.exports = router;