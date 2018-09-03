const faker = require("faker");
const users = require("./users.js");
const posts = require("./posts.js");

const createFakeComment = () => ({
  id: faker.random.uuid(),
  body: faker.lorem.sentences(faker.random.number({ min: 1, max: 5 })),
  user: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
  post: posts[faker.random.number({ min: 0, max: posts.length - 1 })].id
});

/**
 * Create and export array at bottom of file because functions are not
 * hoisting in dynamodb local Java process import
 */
const count = 50;
module.exports = Array.apply(null, Array(count)).map(() => createFakeComment());
