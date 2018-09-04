const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs, resolvers } = require('./graphql/schema');
const models = require('./models');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    ...models,
  }),
});

module.exports = {
  server,
  graphqlHandler: server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  }),
};
