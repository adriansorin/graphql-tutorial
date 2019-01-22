module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'message',
      [
        {
          text: 'youtube message 1',
          channel_id: 1
        },
        {
          text: 'youtube message 2',
          channel_id: 1
        },
        {
          text: 'facebook message 1',
          channel_id: 3
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('message', null, {})
};
