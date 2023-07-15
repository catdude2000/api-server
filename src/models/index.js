'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const food = require('./food.js');
const clothes = require('./clothes.js');

//will make dynamic for testing enviornment
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL; //double colon might not work

// db singleton
const sequelizeDatabase = new Sequelize(DATABASE_URL);

//create our working and connected food db model
const foodModel = food(sequelizeDatabase, DataTypes);
const clothesModel = clothes(sequelizeDatabase, DataTypes);

module.exports = { sequelizeDatabase, foodModel, DataTypes, clothesModel };