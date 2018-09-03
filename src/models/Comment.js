const dynamoose = require("./dynamoose");

// Comment Model
const commentSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true
  },
  user: {
    type: String
  },
  post: {
    type: String
  },
  body: {
    type: String
  }
});

const CommentModel = dynamoose.model("comments", commentSchema);

module.exports = { commentSchema, CommentModel };
