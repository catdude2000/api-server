'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('food', {
    name: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    spicy: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
};