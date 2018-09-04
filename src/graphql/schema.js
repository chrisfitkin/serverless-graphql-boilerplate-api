const { merge } = require('lodash');
const { gql } = require('apollo-server-lambda');
const { typeDef: Post, resolvers: postResolvers } = require('./types/post');
const {
  name, version, description, author, license,
} = require('../../package.json');
const { typeDef: User, resolvers: userResolvers } = require('./types/user');
const { typeDef: Comment, resolvers: commentResolvers } = require('./types/comment');

const Query = gql`
  type Query {
    _empty: String
    about: About
  }

  type About {
    name: String
    version: String
    description: String
    author: String
    license: String
  }
`;

const aboutResolvers = {
  Query: {
    about: () => ({
      name,
      version,
      description,
      author,
      license,
    }),
  },
};

module.exports = {
  typeDefs: [Query, Post, User, Comment],
  resolvers: merge({}, postResolvers, userResolvers, commentResolvers, aboutResolvers),
};
