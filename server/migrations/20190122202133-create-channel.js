module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('channel', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.DataTypes.STRING
    }),

  down: queryInterface => queryInterface.dropTable('channel')
};
