const { PubSub, withFilter } = require('apollo-server');

const pubsub = new PubSub();

const channels = [
  {
    id: 1,
    name: 'soccer',
    messages: [
      {
        id: 1,
        text: 'soccer is football'
      },
      {
        id: 2,
        text: 'hello soccer world cup'
      }
    ]
  },
  {
    id: 2,
    name: 'baseball',
    messages: [
      {
        id: 3,
        text: 'baseball is life'
      },
      {
        id: 4,
        text: 'hello baseball world series'
      }
    ]
  }
];
let nextId = 3;
let nextMessageId = 5;

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
