const util = require("util");
const { merge } = require("lodash");
const { gql } = require("apollo-server-lambda");
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

module.exports = {
  typeDefs: [Query, Post],
  resolvers: merge({}, postResolvers)
};
