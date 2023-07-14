' use strict';

const express = require('express');

const router = express.Router();
const { foodModel } = require('../models');

router.get('/food', async (req, res, next) => {
  let foods = await  foodModel.findAll();
  res.status(200).send(foods);
});

router.get('/food/:id', async (req, res, next) => {
  let singleFood = await foodModel.findAll({where: {id: req.params.id}}); //where clause useful for update
  res.status(200).send(singleFood);
});

router.post('/food', async (req, res, next) => {
  let newFood = await foodModel.create(req.body);
  res.status(200).send(newFood);
});

router.put('/food/:id', async (req, res, next) => {
  let retrievedFood = await foodModel.findOne({where: {id: req.params.id}});
  let updatedFood = await retrievedFood.update(req.body);
  res.status(200).send(updatedFood);
});

router.delete('/food/:id', async (req, res, next) => {
  let deletedFood = await foodModel.destroy({where: {id: req.params.id}});
  res.status(204).json(deletedFood);
});

module.exports = router;