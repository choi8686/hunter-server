module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define(
    "like",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      whoLike: {
        type: DataTypes.INTEGER,
        allowNull: false,
        REFERENCES: { model: "team", key: "id" }
      },
      toLike: {
        type: DataTypes.INTEGER,
        allowNull: false,
        REFERENCES: { model: "team", key: "id" }
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
