const { PostModel } = require('./Post');
const { UserModel } = require('./User');
const { CommentModel } = require('./Comment');
const DynamooseDataLoader = require('../lib/DynamooseModelLoader');

module.exports = {
  Post: new DynamooseDataLoader({ model: PostModel }),
  User: new DynamooseDataLoader({ model: UserModel }),
  Comment: new DynamooseDataLoader({ model: CommentModel }),
};
