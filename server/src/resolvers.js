const channels = [
  {
    id: 1,
    name: 'soccer'
  },
  {
    id: 2,
    name: 'baseball'
  }
];

let nextId = 3;

module.exports = {
  Query: {
    channels: () => channels
  },
  Mutation: {
    addChannel: (root, args) => {
      nextId += 1;
      const newChannel = { id: nextId, name: args.name };
      channels.push(newChannel);
      return newChannel;
    }
  }
};
