const faker = require('faker');
const users = require('./users.js');

const createFakePost = () => ({
  id: faker.random.uuid(),
  title: createTitle(),
  body: faker.lorem.paragraphs(),
  user_id: users[faker.random.number({ min: 0, max: 1 })].id,
});

const createTitle = () => titleCase(faker.lorem.words(faker.random.number({ min: 3, max: 10 })));

const titleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/**
 * Create and export array at bottom of file because functions are not
 * hoisting in dynamodb local Java process import
 */
const count = 10;
module.exports = Array.apply(null, Array(count)).map(() => createFakePost());
