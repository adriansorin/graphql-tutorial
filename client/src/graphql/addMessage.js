import gql from 'graphql-tag';

export const addMessageMutation = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;
