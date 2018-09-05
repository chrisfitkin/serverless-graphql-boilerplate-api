const { gql } = require('apollo-server-lambda');

const typeDef = gql`
  extend type Query {
    user(id: String!): User
    userByEmail(email: String!): User
    users: [User]
  }

  type User {
    id: String!
    username: String
    email: String
    posts: [Post]
    comments: [Comment]
  }
`;

const resolvers = {
  Query: {
    user: ({ id }, args, { User }) => User.load(id),
    userByEmail: ({ email }, args, { User }) => User.model.scan({ email: { eq: email } }).exec(),
    users: (root, args, { User }) => User.model.scan().exec(),
  },
  User: {
    posts: ({ id }, args, { Post }) => Post.model.scan({ user: { eq: id } }).exec(),
    comments: ({ id }, args, { Comment }) => Comment.model.scan({ user: { eq: id } }).exec(),
  },
};

module.exports = {
  typeDef,
  resolvers,
};
