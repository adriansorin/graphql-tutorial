module.exports = (sequelize, DataTypes) => {
  const Channels = sequelize.define(
    'Channels',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING
    },
    {
      tableName: 'channel'
    }
  );

  Channels.associate = models => {
    Channels.hasMany(models.Messages, { foreignKey: 'channel_id', sourceKey: 'id' });
  };

  return Channels;
};
