module.exports = (sequelize, DataTypes) => {
  const teamimage = sequelize.define(
    "teamimage",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      img: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );
  return teamimage;
};
