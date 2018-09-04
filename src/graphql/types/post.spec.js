const { describe, test } = require('mocha');
const { expect } = require('chai');
const { graphql } = require('graphql');
const { makeExecutableSchema, addMockFunctionsToSchema, mockServer } = require('graphql-tools');
const { typeDefs } = require('../schema');

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
