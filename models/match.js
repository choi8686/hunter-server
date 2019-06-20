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
      uuid: {
        //uniqueId
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );

  return match;
};
