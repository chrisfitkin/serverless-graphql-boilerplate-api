const util = require("util");
const { ApolloServer } = require("apollo-server-lambda");
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
