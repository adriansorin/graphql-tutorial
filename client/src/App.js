import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ChannelsList from './components/ChannelsList';
import NotFound from './components/NotFound';
import ChannelDetails from './components/ChannelDetails';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: 'http://192.168.0.104:4001/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://192.168.0.104:4001/graphql`,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link: split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  ),
  cache: new InMemoryCache({
    dataIdFromObject: object => {
      if (object.__typename) {
        if (object.id !== undefined) {
          return `${object.__typename}:${object.id}`;
        }
      }
      return null;
    },
    cacheRedirects: {
      Query: {
        channel: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Channel', id: args.id })
      }
    }
  })
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div className="App">
        <Link to="/" className="navbar">
          React + Apollo
        </Link>
        <Switch>
          <Route exact path="/" component={ChannelsList} />
          <Route path="/channel/:channelId" component={ChannelDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));

export default App;
