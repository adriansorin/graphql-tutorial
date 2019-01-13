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
                refetchQueries: [{ query: listChannelsQuery }]
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
