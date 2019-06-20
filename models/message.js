module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define(
    "messages",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      senderTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      recipientTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      chatroomUUID: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );
  return messages;
};
