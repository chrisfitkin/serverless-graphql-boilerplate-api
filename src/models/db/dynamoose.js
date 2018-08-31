var dynamoose = require("dynamoose");

require("dotenv").config();

// dynamoose.local(process.env.AWS_DYNAMODB_ENDPOINT);

dynamoose.setDefaults({
  create: true, // Create table in DB if it does not exist
  prefix: `${process.env.STAGE}.`, // Default prefix for all DynamoDB tables
  suffix: "" // Default suffix for all DynamoDB tables
});

module.exports = dynamoose;
