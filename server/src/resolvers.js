const { PubSub, withFilter } = require('apollo-server');

const pubsub = new PubSub();

module.exports = {
  Channel: {
    messages: (parent, args, { db }) =>
      db.Messages.findAll({
        where: {
          channelID: parent.id
        }
      })
  },
  Query: {
    channels: (parent, args, { db }) => db.Channels.findAll(),
    channel: async (parent, { id }, { db }) =>
      db.Channels.findOne({
        where: { id }
      })
  },
  Mutation: {
    addChannel: (parent, { name }, { db }) =>
      db.Channels.create({
        name
      }),
    addMessage: async (root, { message }, { db }) => {
      const currentChannel = await db.Channels.findByPk(message.channelId);
      if (!currentChannel) throw new Error('Channel does not exist');

      const newMessage = await db.Messages.create({
        text: message.text,
        channelID: currentChannel.id
      });

      pubsub.publish('messageAdded', { messageAdded: newMessage, channelId: message.channelId });
      return newMessage;
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('messageAdded'),
        (payload, variables) => payload.channelId === variables.channelId
      )
    }
  }
};
