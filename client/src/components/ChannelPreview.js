import React from 'react';
import { Query } from 'react-apollo';

import { channelQuery } from '../graphql';

const ChannelPreview = props => (
  <Query query={channelQuery} variables={{ channelId: props.channelId }}>
    {({ loading, error, data }) => {
      return (
        <>
          <div className="channelName">{data.channel ? data.channel.name : 'Loading...'}</div>

          <div>Loading Messages</div>
        </>
      );
    }}
  </Query>
);

export default ChannelPreview;
