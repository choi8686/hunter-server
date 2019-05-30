module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define(
    "messages",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      senderTeam: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      toTeam: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );
  return messages;
};
