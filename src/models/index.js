const { PostModel } = require("./Post");
const { UserModel } = require("./User");
const { CommentModel } = require("./Comment");

module.exports = {
  Post: PostModel,
  User: UserModel,
  Comment: CommentModel
};
