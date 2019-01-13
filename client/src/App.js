import React from 'react';
import { render } from 'react-dom';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ChannelsList from './components/ChannelsList';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(window.__APOLLO_STATE__)
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <div className="navbar">React + Apollo</div>
      <ChannelsList />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));

export default App;
