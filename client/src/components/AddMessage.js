import React from 'react';
import { withRouter } from 'react-router';
import { Mutation } from 'react-apollo';
import { channelDetailsQuery, addMessageMutation } from '../graphql';

const AddMessage = ({ match }) => {
  return (
    <Mutation mutation={addMessageMutation}>
      {(addMessage, { data }) => (
        <div className="messageInput">
          <input
            type="text"
            placeholder="New message"
            onKeyUp={e => {
              if (e.keyCode === 13) {
                addMessage({
                  variables: {
                    message: {
                      channelId: match.params.channelId,
                      text: e.target.value
                    }
                  },
                  optimisticResponse: {
                    addMessage: {
                      text: e.target.value,
                      id: Math.round(Math.random() * -1000000),
                      __typename: 'Message'
                    }
                  },
                  update: (store, { data: { addMessage } }) => {
                    // Read the data from the cache for this query.
                    const data = store.readQuery({
                      query: channelDetailsQuery,
                      variables: {
                        channelId: match.params.channelId
                      }
                    });
                    // Add our Message from the mutation to the end.
                    if (!data.channel.messages.find(msg => msg.id === addMessage.id)) {
                      data.channel.messages.push(addMessage);
                    }
                    // Write the data back to the cache.
                    store.writeQuery({
                      query: channelDetailsQuery,
                      variables: {
                        channelId: match.params.channelId
                      },
                      data
                    });
                  }
                });
                e.target.value = '';
              }
            }}
          />
        </div>
      )}
    </Mutation>
  );
};

export default withRouter(AddMessage);
