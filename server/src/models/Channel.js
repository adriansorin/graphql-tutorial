module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'channel',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );

  Channel.associate = models => {
    Channel.hasMany(models.Message, { foreignKey: 'channel_id', sourceKey: 'id' });
  };

  return Channel;
};
