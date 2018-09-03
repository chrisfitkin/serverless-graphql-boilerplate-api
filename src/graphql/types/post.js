const { gql } = require("apollo-server-lambda");

const typeDef = gql`
  extend type Query {
    post(id: String!): Post
    posts: [Post]
    extendPost: String
    test: String
    badCat: String
  }

  type Post {
    id: String!
    title: String!
    body: String
    user: String
  }
`;
// TODO: convert user to type User!

const resolvers = {
  Query: {
    post: (root, { id }, { Post }) => Post.get({ id }),
    posts: (root, args, context) => {
      console.log("context", context);
      const { Post } = context;
      const scanPosts = Post.scan().exec();
      return scanPosts;
    }
  }
};

module.exports = {
  typeDef,
  resolvers
};
