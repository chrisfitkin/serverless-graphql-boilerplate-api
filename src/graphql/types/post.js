const { gql } = require('apollo-server-lambda');

const typeDef = gql`
  extend type Query {
    post(id: String!): Post
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    body: String
    user: User
    comments: [Comment]
  }
`;

const resolvers = {
  Query: {
    post: (root, { id }, { Post }) => Post.get({ id }),
    posts: (root, args, { Post }) => Post.scan().exec(),
  },
  Post: {
    user: ({ user }, args, { User }) => User.get({ id: user }),
    comments: ({ id }, args, { Comment }) => Comment.scan({ post: { eq: id } }).exec(),
  },
};

module.exports = {
  typeDef,
  resolvers,
};
