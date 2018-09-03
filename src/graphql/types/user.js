const { gql } = require("apollo-server-lambda");

const typeDef = gql`
  extend type Query {
    user(id: String!): User
    users: [User]
  }

  type User {
    id: String!
    username: String
    email: String
    posts: [Post]
  }
`;

const resolvers = {
  Query: {
    user: ({ user }, args, { User }) => User.get({ id: user }),
    users: (root, args, { User }) => User.scan().exec()
  },
  User: {
    posts: async (user, args, { Post }) => {
      console.log("User.posts.user", user);
      const posts = await Post.scan({ user: { eq: user.id } }).exec();
      console.log("User.posts.posts", posts);
      return posts;
    }
  }
};

module.exports = {
  typeDef,
  resolvers
};
