"use strict";
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define(
    "match",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      team1: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      team2: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );

  return match;
};
