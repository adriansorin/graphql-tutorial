import React from 'react';
import { Query } from 'react-apollo';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';
import NotFound from './NotFound';
import { channelDetailsQuery, messageSubscription } from '../graphql';

const ChannelDetails = ({ match }) => (
  <Query query={channelDetailsQuery} variables={{ channelId: match.params.channelId }}>
    {({ subscribeToMore, loading, error, data }) => {
      if (loading) {
        return <ChannelPreview channelId={match.params.channelId} />;
      }

      if (error) {
        return <p>{error.message}</p>;
      }

      if (data.channel === null) {
        return <NotFound />;
      }

      return (
        <div>
          <div className="channelName">{data.channel.name}</div>
          <MessageList
            messages={data.channel.messages}
            subscribeToNewMessages={() =>
              subscribeToMore({
                document: messageSubscription,
                variables: { channelId: data.channel.id },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  const newMessage = subscriptionData.data.messageAdded;

                  if (!prev.channel.messages.find(msg => msg.id === newMessage.id)) {
                    return Object.assign({}, prev, {
                      channel: Object.assign({}, prev.channel, {
                        messages: [...prev.channel.messages, newMessage]
                      })
                    });
                  } else {
                    return prev;
                  }
                }
              })
            }
          />
        </div>
      );
    }}
  </Query>
);

export default ChannelDetails;
