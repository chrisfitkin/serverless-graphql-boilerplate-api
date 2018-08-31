const { promisify } = require("util");
const { gql } = require("apollo-server-lambda");
const posts = require("../../../.seed/posts");
const PostModel = require("../../models/Post");

const typeDef = gql`
  extend type Query {
    post(id: String!): Post
    posts: [Post]
    extendPost: String
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
    post: (root, { id }) => {
      console.log("PostModel.queryOne", id);
      return new Promise((resolve, reject) => {
        PostModel.queryOne({ id: { eq: id } }, function(err, post) {
          console.log("err", err);
          if (err) reject(err);

          console.log("post", post);
          resolve(post);
        });
      });
    },
    posts: (root, args) => {
      console.log("PostModel", PostModel);
      return promisify(PostModel.scan().exec);
    },
    extendPost: () => "hello extend world"
  }
};

module.exports = {
  typeDef,
  resolvers
};
