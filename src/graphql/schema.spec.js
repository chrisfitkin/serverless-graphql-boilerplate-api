const { describe, test } = require('mocha');
const chai = require('chai');
const spies = require('chai-spies');
// const { graphql } = require('graphql');
// const { makeExecutableSchema, addMockFunctionsToSchema, mockServer } = require('graphql-tools');
// const { typeDefs } = require('./schema');
const { rootResolvers } = require('./schema');
const {
  name, version, description, author, license,
} = require('../../package.json');

chai.use(spies);
const { expect } = chai;

// TODO: Test typeDefs

// Test the Root Resolvers
describe('GraphQL Root Resolvers', () => {
  test('Query.about', () => {
    const args = {};
    const ctx = {};

    const result = rootResolvers.Query.about(null, args, ctx);

    expect(result).to.deep.equal({
      name,
      version,
      description,
      author,
      license,
    });
  });
});
