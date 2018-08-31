const { gql } = require("apollo-server");

const typeDef = gql`
  type Post {
    id: String!
    title: String!
    body: String
    user: String
  }
`; // TODO: convert user to type User!

const resolvers = {};

module.exports = {
  typeDef,
  resolvers
};
