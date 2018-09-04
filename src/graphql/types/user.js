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
    user: ({ id }, args, { User }) => User.get({ id }),
    userByEmail: ({ email }, args, { User }) => User.scan({ email: { eq: email } }).exec(),
    users: (root, args, { User }) => User.scan().exec(),
  },
  User: {
    posts: ({ id }, args, { Post }) => Post.scan({ user: { eq: id } }).exec(),
    comments: ({ id }, args, { Comment }) => Comment.scan({ user: { eq: id } }).exec(),
  },
};

module.exports = {
  typeDef,
  resolvers,
};
