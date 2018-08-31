const _ = require("lodash");
const { gql } = require("apollo-server");
const { makeExecutableSchema } = require("graphql-tools");
const { typeDef: Post, resolvers: postResolvers } = require("./types/post");
// const { typeDef: User, resolvers: userResolvers } = require("./types/user");
// const {
//   typeDef: Comment,
//   resolvers: commentResolvers
// } = require("./types/comment");

const Query = gql`
  type Query {
    _empty: String
  }
`;

// Export as plain object?
module.exports = makeExecutableSchema({
  typeDefs: [Query, Post /*, User, Comment */],
  resolvers: _.merge({}, postResolvers /*, commentResolvers, userResolvers */)
});
