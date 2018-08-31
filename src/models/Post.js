const dynamoose = require("./db/dynamoose");
const { Schema } = dynamoose;

// User Model
const postSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
    required: true
  },
  title: {
    type: String,
    rangeKey: true,
    index: true // name: titleLocalIndex, ProjectionType: ALL
  },
  body: {
    type: String
  },
  user: {
    type: String
  }
});

var PostModel = dynamoose.model("Post", postSchema);

module.exports = PostModel;
