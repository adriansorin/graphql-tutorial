import React from 'react';
import { Mutation } from 'react-apollo';
import { listChannelsQuery, addChannelMutation } from '../graphql';

const AddChannel = () => {
  return (
    <Mutation mutation={addChannelMutation}>
      {(addChannel, { data }) => (
        <input
          type="text"
          placeholder="New channel"
          onKeyUp={e => {
            if (e.keyCode === 13) {
              e.persist();
              addChannel({
                variables: { name: e.target.value },
                update: (store, { data: { addChannel } }) => {
                  // Read the data from the store for this query
                  const data = store.readQuery({ query: listChannelsQuery });
                  // Add new channel from the mutation
                  data.channels.push(addChannel);
                  // Write data back to store
                  store.writeQuery({ query: listChannelsQuery, data });
                },
                optimisticResponse: {
                  addChannel: {
                    name: e.target.value,
                    id: Math.round(Math.random() * -1000000),
                    __typename: 'Channel'
                  }
                }
              }).then(res => {
                e.target.value = '';
              });
            }
          }}
        />
      )}
    </Mutation>
  );
};

export default AddChannel;
