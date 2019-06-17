"use strict";
module.exports = (sequelize, DataTypes) => {
  const store = sequelize.define(
    "store",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      store: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );

  return store;
};
