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
  Query: {
    channels: () => channels,
    channel: (root, { id }) => channels.find(channel => Number(channel.id) === Number(id))
  },
  Mutation: {
    addChannel: (root, args) => {
      nextId += 1;
      const newChannel = { id: nextId, name: args.name, messages: [] };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, { message }) => {
      const currentChannel = channels.find(
        channel => Number(channel.id) === Number(message.channelId)
      );
      if (!currentChannel) throw new Error('Channel does not exist');

      const newMessage = { id: String((nextMessageId += 1)), text: message.text };
      currentChannel.messages.push(newMessage);

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
