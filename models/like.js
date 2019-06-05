module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define(
    "like",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      introText: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: true
    }
  );
  return like;
};
