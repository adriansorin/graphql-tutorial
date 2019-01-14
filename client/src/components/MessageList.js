import React, { Component } from 'react';

import AddMessage from './AddMessage';

class MessageList extends Component {
  componentDidMount() {
    this.props.subscribeToNewMessages();
  }

  render() {
    return (
      <div className="messagesList">
        {this.props.messages.map(message => (
          <div key={message.id} className={'message ' + (message.id < 0 ? 'optimistic' : '')}>
            {message.text}
          </div>
        ))}
        <AddMessage />
      </div>
    );
  }
}

export default MessageList;
