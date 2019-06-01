"use strict";
module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define(
    "team",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      sex: {
        type: DataTypes.INTEGER, // if 0 = female, 1 = male
        allowNull: false
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      teamname: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );

  return team;
};
