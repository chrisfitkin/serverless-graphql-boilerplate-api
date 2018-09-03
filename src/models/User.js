const dynamoose = require("./dynamoose");

// Post Model
const postSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true
  },
  username: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  }
});

const UserModel = dynamoose.model("users", postSchema);

module.exports = { postSchema, UserModel };
