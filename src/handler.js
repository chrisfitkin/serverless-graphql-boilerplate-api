const util = require("util");
const { ApolloServer /*, gql*/ } = require("apollo-server-lambda");
// const { makeExecutableSchema } = require("graphql-tools");
const schema = require("./graphql/schema");

const server = new ApolloServer({ schema });
// const server = new ApolloServer( {
//   ...schema,
//   context: ({ event, context }) => ({
//     headers: event.headers,
//     functionName: context.functionName,
//     event,
//     context
//   })
// });

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
