const Query = require("../config/query");

const answer = {
  findForPost: function (postId, cb) {
    const query = new Query();

    query.select(
      [
        "replies.ID",
        "username",
        "replies.body"
      ])
      .from(
        {
          name: "posts",
          as: "replies"
        }
      )
      .innerJoin("posts", "posts.ID", "replies.reply_to_id")
      .innerJoin("users", "users.ID", "replies.user_id")
      .whereEqual("posts.ID", postId)
      .go(function(err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
  });
  }
};

module.exports = answer;