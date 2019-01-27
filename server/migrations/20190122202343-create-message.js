module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('message', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      channelID: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'channel_id',
        references: {
          key: 'id',
          model: 'channel'
        }
      }
    }),

  down: queryInterface => queryInterface.dropTable('message')
};
