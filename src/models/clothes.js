'use strict';

// establishing the model/schema for the clothes model

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('clothes', {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
