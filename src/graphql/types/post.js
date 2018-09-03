const { gql } = require("apollo-server-lambda");

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
  }
`;

const resolvers = {
  Query: {
    post: (root, { id }, { Post }) => Post.get({ id }),
    posts: (root, args, { Post }) => Post.scan().exec()
  },
  Post: {
    user: ({ user }, args, { User }) => User.get({ id: user })
  }
};

module.exports = {
  typeDef,
  resolvers
};
