const { describe, test } = require('mocha');
const chai = require('chai');
const spies = require('chai-spies');
const { graphql } = require('graphql');
const { makeExecutableSchema, addMockFunctionsToSchema, mockServer } = require('graphql-tools');
const { typeDefs } = require('../schema');
const { resolvers } = require('./post');

chai.use(spies);
const { expect } = chai;

const testCases = [
  {
    id: 'list posts with user and comments',
    query: `
      query {
        posts {
          id
          body
          title,
          user { username }
          comments { body }
        }
      }
    `,
    variables: {},
    context: {},
    expected: {
      data: {
        posts: [
          {
            id: '1',
            body: 'Lorem',
            title: 'Lorem',
            user: { username: 'Lorem' },
            comments: [{ body: 'Lorem' }, { body: 'Lorem' }],
          },
          {
            id: '1',
            body: 'Lorem',
            title: 'Lorem',
            user: { username: 'Lorem' },
            comments: [{ body: 'Lorem' }, { body: 'Lorem' }],
          },
        ],
      },
    },
  },
  {
    id: 'get post by id',
    query: `
      query {
        post(id: "1") {
          id
          title
        }
      }
    `,
    variables: {},
    context: {},
    expected: {
      data: { post: { id: '1', title: 'Lorem' } },
    },
  },
  {
    id: 'returns error for invalid field',
    query: `
      query {
        post(id: "1") {
          invalidField
        }
      }
    `,
    variables: {},
    context: {},
    expected: false,
    errors: true,
  },
];

describe('GraphQL Post Schema', () => {
  // Array of case types
  const cases = testCases;

  const mockSchema = makeExecutableSchema({ typeDefs });

  // Here we specify the return payloads of mocked types
  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Boolean: () => true,
      ID: () => '1',
      Int: () => 1,
      Float: () => 12.34,
      String: () => 'Lorem',
    },
  });

  const MockServer = mockServer(typeDefs);
  test('has valid type definitions', async () => {
    // eslint-disable-next-line no-return-await
    expect(async () => await MockServer.query('{ __schema { types { name } } }')).not.to.throw();
  });
  test('includes Post definition', async () => {
    const result = await MockServer.query('{ __schema { types { name } } }');
    expect(result.data.__schema.types).to.deep.include({ name: 'Post' });
  });

  cases.forEach(({
    id, query, variables, context: ctx, expected, errors,
  }) => {
    test(`query: ${id}`, async () => {
      const result = await graphql(mockSchema, query, null, { ctx }, variables);
      if (expected) expect(result).to.deep.equal(expected);
      if (errors) expect(result).to.have.own.property('errors');
    });
  });
});

describe('GraphQL Post Resolvers', () => {
  test('Query.post(id: String!)', () => {
    // Mock the Dynamoose Post Model
    const mockPostModel = chai.spy.interface({
      get: ({ id }) => ({
        id,
        body: 'Lorem',
        title: 'Lorem',
        user: '1',
        comments: ['1', '1'],
      }),
    });

    const args = { id: '1' };
    const ctx = { Post: mockPostModel };

    const result = resolvers.Query.post(null, args, ctx);

    expect(mockPostModel.get).to.be.called.once.with({ id: '1' });
    expect(result).to.deep.equal({
      id: '1',
      body: 'Lorem',
      title: 'Lorem',
      user: '1',
      comments: ['1', '1'],
    });
  });
  test('Query.posts', () => {
    // Mock the Dynamoose Post Model
    const mockPostModel = chai.spy.interface({
      scan: () => ({
        exec: () => [
          {
            id: '1',
            body: 'Lorem',
            title: 'Lorem',
            user: '1',
            comments: ['1', '1'],
          },
        ],
      }),
    });

    const args = {};
    const ctx = { Post: mockPostModel };

    const result = resolvers.Query.posts(null, args, ctx);

    expect(mockPostModel.scan).to.be.called.once.with();
    expect(result).to.deep.equal([
      {
        id: '1',
        body: 'Lorem',
        title: 'Lorem',
        user: '1',
        comments: ['1', '1'],
      },
    ]);
  });
  test('Post.user', () => {
    const post = {
      id: '1',
      body: 'Lorem',
      title: 'Lorem',
      user: '1',
      comments: ['1', '1'],
    };

    // Mock the Dynamoose User Model
    const mockUserModel = chai.spy.interface({
      get: ({ id }) => ({ id, username: 'Lorem', email: 'Lorem' }),
    });

    const args = {};
    const ctx = { User: mockUserModel };

    const result = resolvers.Post.user(post, args, ctx);

    expect(mockUserModel.get).to.be.called.once.with({ id: '1' });
    expect(result).to.deep.equal({ id: '1', username: 'Lorem', email: 'Lorem' });
  });
  test('Post.comments', () => {
    const post = {
      id: '1',
      body: 'Lorem',
      title: 'Lorem',
      user: '1',
      comments: ['1', '1'],
    };

    // Mock the Dynamoose Comment Model
    const mockCommentModel = chai.spy.interface({
      scan: ({ post: { eq: id } }) => ({
        exec: () => [
          {
            id,
            post: '1',
            user: '1',
            body: 'Lorem',
          },
        ],
      }),
    });

    const args = {};
    const ctx = { Comment: mockCommentModel };

    const result = resolvers.Post.comments(post, args, ctx);

    expect(mockCommentModel.scan).to.be.called.once.with({ post: { eq: '1' } });
    expect(result).to.deep.equal([
      {
        id: '1',
        post: '1',
        user: '1',
        body: 'Lorem',
      },
    ]);
  });
});
