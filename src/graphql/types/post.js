const { promisify } = require("util");
const { gql } = require("apollo-server-lambda");
const posts = require("../../../.seed/posts");
const PostModel = require("../../models/Post");

const typeDef = gql`
  type Post {
    id: String!
    title: String!
    body: String
    user: String
  }
`;
// TODO: extend type Query { post: Post }
// TODO: convert user to type User!

const resolvers = {
  Query: {
    // post: (root, { id }) => promisify(PostModel.get)({ id }),
    post: (root, { id }) => promisify(PostModel.queryOne)({ id: { eq: id } }),
    posts: (root, args) => {
      console.log("PostModel", PostModel);
      return promisify(PostModel.scan().exec);
    }
  }
};

module.exports = {
  typeDef,
  resolvers
};
