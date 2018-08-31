const util = require("util");
const { merge } = require("lodash");
const { gql } = require("apollo-server-lambda");
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
    post(id: String!): Post
    posts: [Post]
  }
`;
// TODO: Colocate type Query { ...[types] } in respective ./types/[type].js file

module.exports = makeExecutableSchema({
  typeDefs: [Query, Post],
  resolvers: merge({}, postResolvers)
});
