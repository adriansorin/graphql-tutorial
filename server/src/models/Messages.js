module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    'Messages',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      channelID: {
        type: DataTypes.INTEGER,
        field: 'channel_id'
      }
    },
    {
      tableName: 'message'
    }
  );

  Messages.associate = models => {
    Messages.belongsTo(models.Channels, { foreignKey: 'channel_id', targetKey: 'id' });
  };

  return Messages;
};
