const dynamoose = require("./db/dynamoose");
const { Schema } = dynamoose;

// Post Model
const postSchema = new Schema({
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
  }
});

var PostModel = dynamoose.model("post", postSchema);

module.exports = PostModel;
