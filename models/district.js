"use strict";
module.exports = (sequelize, DataTypes) => {
  const district = sequelize.define(
    "district",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );

  return district;
};
