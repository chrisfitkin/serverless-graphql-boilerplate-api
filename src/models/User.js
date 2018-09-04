const dynamoose = require('./dynamoose');

// User Model
const userSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true,
  },
  username: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    index: true,
  },
});

const UserModel = dynamoose.model('users', userSchema);

module.exports = { userSchema, UserModel };
