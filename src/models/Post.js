// const dynamoose = require("./db/dynamoose");
var dynamoose = require("dynamoose");

// require("dotenv").config();

// dynamoose.local(process.env.AWS_DYNAMODB_ENDPOINT || "http://localhost:8000");

dynamoose.setDefaults({
  create: true, // Create table in DB if it does not exist
  prefix: `${process.env.STAGE}.`, // Default prefix for all DynamoDB tables
  suffix: "" // Default suffix for all DynamoDB tables
});

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
  }
});

const PostModel = dynamoose.model("posts", postSchema);

console.log("Post.js::dynamoose", dynamoose);

module.exports = { postSchema, PostModel };
