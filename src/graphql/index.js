var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var queryType = require("./queries/post").queryType;
var mutation = require("./mutations/index");

exports.postSchema = new GraphQLSchema({
  query: queryType
  //   mutation: new GraphQLObjectType({
  //     name: "Mutation",
  //     fields: mutation
  //   })
});
