const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { schema } = require('./src/schema');

const PORT = 4001;

const server = express();

server.use('*', cors({ origin: 'http://localhost:3000' }));

server.use(async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  next();
});

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
