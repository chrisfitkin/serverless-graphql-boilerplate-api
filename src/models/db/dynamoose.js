var dynamoose = require("dynamoose");

require("dotenv").config();

dynamoose.local(process.env.AWS_DYNAMODB_ENDPOINT);

module.exports = dynamoose;
