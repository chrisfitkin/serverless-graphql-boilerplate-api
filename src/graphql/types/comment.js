const { gql } = require("apollo-server-lambda");

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
    comments: (root, args, { Comment }) => Comment.scan().exec()
  },
  Comment: {
    post: async (comment, args, { Post }) => {
      console.log("comment", comment);
      const result = await Post.get({ id: comment.post });
      console.log("post.result", result);
      return result;
    },
    user: async (comment, args, { User }) => {
      console.log("comment", comment);
      const result = await User.get({ id: comment.user });
      console.log("user.result", result);
      return result;
    }
    // user: ({ user }, { id }, { User }) => User.get({ id: user })
  }
};

module.exports = {
  typeDef,
  resolvers
};
