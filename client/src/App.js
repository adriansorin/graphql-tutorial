import React from 'react';
import { render } from 'react-dom';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
console.log(new SchemaLink({ schema }));

const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(window.__APOLLO_STATE__)
});

const ChannelsList = () => (
  <Query
    query={gql`
      {
        channels {
          id
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>{error.message}</p>;
      }

      return (
        <ul class="Item-list">
          {data.channels.map(ch => (
            <li key={ch.id}>{ch.name}</li>
          ))}
        </ul>
      );
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Apollo</h2>
      </header>
      <ChannelsList />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));

export default App;
