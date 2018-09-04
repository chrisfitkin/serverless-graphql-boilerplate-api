const { gql } = require('apollo-server-lambda');

const typeDef = gql`
  extend type Query {
    comment(id: String!): Comment
    comments: [Comment]
  }

  type Comment {
    id: String!
    user: User!
    post: Post!
    body: String
  }
`;

const resolvers = {
  Query: {
    comment: ({ id }, args, { Comment }) => Comment.get({ id }),
    comments: (root, args, { Comment }) => Comment.scan().exec(),
  },
  Comment: {
    post: async ({ post }, args, { Post }) => Post.get({ id: post }),
    user: async ({ user }, args, { User }) => User.get({ id: user }),
  },
};

module.exports = {
  typeDef,
  resolvers,
};
