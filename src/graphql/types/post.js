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
    // post: (root, { id }) => promisify(PostModel.get)({ id }),
    // post: async (root, { id }) => {
    //   console.log("post.js::resolvers.Query.post", id);
    //   const post = PostModel.get({ id });
    //   console.log("post.js::resolvers.Query.posts.get", post);
    //   return post;
    // },
    posts: async (root, args, { Post }) => {
      const scanPosts = await Post.scan().exec();
      return scanPosts;
    }
  }
};

module.exports = {
  typeDef,
  resolvers
};
