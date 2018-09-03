const faker = require("faker");

const createFakeUser = () => ({
  id: faker.random.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.exampleEmail()
});

/**
 * Create and export array at bottom of file because functions are not
 * hoisting in dynamodb local Java process import
 */
const count = 10;
module.exports = Array.apply(null, Array(count)).map(() => createFakeUser());
