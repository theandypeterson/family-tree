const express = require('express');
const bodyParser = require('body-parser');
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { Person } from './models/models';
import schema from './schema';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const buildContext = () => ({
  Person: new Person(),
});

app.use('/api/graphql', graphqlExpress(req => {
  return {
    schema,
    context: buildContext()
  };
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/api/graphql',
  query: `
  `
  ,
}));

export default app;
