const dynamoose = require("./dynamoose");

// Post Model
const postSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true
  },
  title: {
    type: String,
    rangeKey: false,
    index: true // name: titleLocalIndex, ProjectionType: ALL
  },
  body: {
    type: String
  },
  user: {
    type: String
    // index: true // Add index to make searchable
  }
});

const PostModel = dynamoose.model("posts", postSchema);

module.exports = { postSchema, PostModel };
