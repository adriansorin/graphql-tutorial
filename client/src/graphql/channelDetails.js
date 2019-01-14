import gql from 'graphql-tag';

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

export const channelQuery = gql`
  query ChannelDetailsQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
    }
  }
`;
