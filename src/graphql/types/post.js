const { promisify } = require("util");
const { gql } = require("apollo-server-lambda");
const posts = require("../../../.seed/posts");
const { PostModel } = require("../../models/Post");

console.log("post.js::PostModel", PostModel);

const typeDef = gql`
  extend type Query {
    post(id: String!): Post
    posts: [Post]
    extendPost: String
    test: String
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
    post: async (root, { id }) => {
      console.log("post.js::resolvers.Query.post", id);
      const post = PostModel.get({ id });
      console.log("post.js::resolvers.Query.posts.get", post);
      return post;
    },
    posts: async (root, args) => {
      console.log("post.js::resolvers.Query.posts");
      const scanPosts = await promisify(PostModel.scan)();
      console.log("post.js::resolvers.Query.posts.scanPosts", scanPosts);
      return scanPosts;
    },
    extendPost: () => "hello extend world",
    test: () => {
      return new Promise((resolve, reject) => {
        PostModel.scan().exec(function(err, posts) {
          if (err) reject(err);
          // Look at all the posts
          console.log("posts", posts);
          resolve(JSON.stringify(posts));
        });
      });
    }
  }
};

module.exports = {
  typeDef,
  resolvers
};
