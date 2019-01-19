module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'message',
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
      freezeTableName: true
    }
  );

  Message.associate = models => {
    Message.belongsTo(models.Channel, { foreignKey: 'channel_id', targetKey: 'id' });
  };

  return Message;
};
