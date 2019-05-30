module.exports = (sequelize, DataTypes) => {
  const blacklist = sequelize.define(
    "blacklist",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      whoBlock: {
        type: DataTypes.ObjectId,
        allowNull: false
      },
      toBlock: {
        type: DataTypes.ObjectId,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );
  return blacklist;
};
