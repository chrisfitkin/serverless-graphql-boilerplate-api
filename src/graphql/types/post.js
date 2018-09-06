/* eslint-disable camelcase, no-unused-vars */
const { gql } = require('apollo-server-lambda');
const uuid = require('uuidv4');

const typeDef = gql`
  extend type Query {
    Post(id: ID!): Post
    allPosts(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: PostFilter
    ): [Post]
    _allPostsMeta(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: PostFilter
    ): ListMetadata
  }

  extend type Mutation {
    createPost(id: ID, title: String, body: String, user_id: ID): Post
    updatePost(id: ID, title: String, body: String, user_id: ID): Post
    deletePost(id: ID): Boolean
  }

  type Post {
    id: String!
    title: String!
    body: String
    user_id: String
    User: User
    Comments: [Comment]
  }

  input PostInput {
    id: ID
    title: String
    body: String
    user_id: ID
  }

  input PostFilter {
    q: String
    id: ID
    title: String
    user_id: ID
  }
`;

const resolvers = {
  Query: {
    Post: (root, { id }, { Post }) => Post.load(id),
    allPosts: (root, args, { Post }) => Post.model.scan().exec(),
    _allPostsMeta: (root, args, { Post }) => ({
      count: Post.model
        .scan()
        .count()
        .exec(),
    }),
  },
  Post: {
    User: ({ user_id }, args, { User }) => User.load(user_id),
    Comments: ({ id }, args, { Comment }) => Comment.model.scan({ post: { eq: id } }).exec(),
  },
  Mutation: {
    createPost: (root, { title, body, user_id }, { Post }) => Post.model.create({
      id: uuid(),
      title,
      body,
      user_id,
    }),
    updatePost: (root, { id, title, body }, { Post }) => Post.model.update(
      { id },
      {
        title,
        body,
      },
    ),
    deletePost: async (root, { id }, { Post }) => {
      await Post.model.delete({ id }, { update: true });
      return true;
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
