module.exports = (sequelize, DataTypes) => {
  const teamimage = sequelize.define(
    "teamimage",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );
  return teamimage;
};
