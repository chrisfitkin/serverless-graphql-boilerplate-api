const { gql } = require('apollo-server-lambda');
const uuid = require('uuidv4');

const typeDef = gql`
  extend type Query {
    post(id: String!): Post
    posts: [Post]
  }

  extend type Mutation {
    createPost(input: PostInput): Post
  }

  type Post {
    id: String!
    title: String!
    body: String
    user: User
    comments: [Comment]
  }

  input PostInput {
    title: String
    body: String
    user: ID
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
  Mutation: {
    createPost: (root, { input: { title, body, user } }, { Post }) => Post.model.create({
      id: uuid(),
      title,
      body,
      user,
    }),
  },
};

module.exports = {
  typeDef,
  resolvers,
};
