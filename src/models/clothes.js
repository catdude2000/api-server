'use strict';


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
