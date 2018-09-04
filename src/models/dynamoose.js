const dynamoose = require('dynamoose');

require('dotenv').config();

dynamoose.AWS.config.update({
  region: 'localhost', // e.g. "us-east-1"
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'ACCESS_KEY_ID',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'SECRET_ACCESS_KEY',
});
if (process.env.NODE_ENV === 'dev') {
  const dynamoDbEndpoint = process.env.AWS_DYNAMODB_ENDPOINT || 'http://localhost:8000';
  // console.log("Connecting to DynamoDB in 'local' config at ", dynamoDbEndpoint);
  dynamoose.local(dynamoDbEndpoint);
}

dynamoose.setDefaults({
  create: process.env.NODE_ENV === 'dev', // Create table in DB if it does not exist
  prefix: `${process.env.STAGE}.`, // Default prefix for all DynamoDB tables
  suffix: '', // Default suffix for all DynamoDB tables
});

module.exports = dynamoose;
