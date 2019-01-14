import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import AddChannel from './AddChannel';
import { listChannelsQuery } from '../graphql';

const ChannelsList = () => (
  <Query query={listChannelsQuery} pollInterval={500}>
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>{error.message}</p>;
      }

      return (
        <div className="channelsList">
          <AddChannel />
          {data.channels.map(ch => (
            <div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>
              <Link to={ch.id < 0 ? `/` : `channel/${ch.id}`}>{ch.name}</Link>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default ChannelsList;
