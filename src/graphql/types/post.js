const { gql } = require('apollo-server-lambda');

const typeDef = gql`
  extend type Query {
    post(id: String!): Post
    posts: [Post]
  }

  type Post {
    id: String!
    title: String!
    body: String
    user: User
    comments: [Comment]
  }
`;

const resolvers = {
  Query: {
    post: (root, { id }, { Post }) => Post.load(id),
    posts: (root, args, { Post }) => Post.model.scan().exec(),
  },
  Post: {
    user: ({ user }, args, { User }) => User.load(user),
    comments: ({ id }, args, { Comment }) => Comment.model.scan({ post: { eq: id } }).exec(),
  },
};

module.exports = {
  typeDef,
  resolvers,
};
