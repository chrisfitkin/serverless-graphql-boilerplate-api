/* eslint-disable camelcase, no-unused-vars */
const { gql } = require('apollo-server-lambda');

const typeDef = gql`
  extend type Query {
    User(id: ID!): User
    allUsers(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: PostFilter
    ): [User]
    _allUsersMeta(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: PostFilter
    ): ListMetadata
    userByEmail(email: String!): User
  }

  type User {
    id: String!
    username: String
    email: String
    # posts: [Post]
    comments: [Comment]
  }
`;

const resolvers = {
  Query: {
    User: ({ id }, args, { User }) => User.load(id),
    allUsers: (root, args, { User }) => User.model.scan().exec(),
    _allUsersMeta: (root, args, { User }) => ({ count: User.model.query().count() }),
    userByEmail: ({ email }, args, { User }) => User.model.scan({ email: { eq: email } }).exec(),
  },
  User: {
    // posts: ({ id }, args, { Post }) => Post.model.scan({ user: { eq: id } }).exec(),
    comments: ({ id }, args, { Comment }) => Comment.model.scan({ user: { eq: id } }).exec(),
  },
};

module.exports = {
  typeDef,
  resolvers,
};
