import React from 'react';
import { render } from 'react-dom';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const client = new ApolloClient({
  networkInterface: mockNetworkInterface
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
