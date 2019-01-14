const express = require('express');
const cors = require('cors');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { schema } = require('./src/schema');

const PORT = 4001;

const server = new ApolloServer({
  schema
});

const app = express();

app.use('*', cors({ origin: 'http://localhost:3000' }));

app.use(async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 0));

  next();
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
