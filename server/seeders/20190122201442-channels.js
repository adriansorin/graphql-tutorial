module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'channel',
      [
        {
          name: 'youtube'
        },
        {
          name: 'google'
        },
        {
          name: 'facebook'
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('channel', null, {})
};
