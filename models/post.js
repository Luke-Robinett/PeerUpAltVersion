const Query = require("../config/query");

const post = {
  findAll: function (cb) {
    const query = new Query();
    query.select(
      [
        "posts.ID",
        "username",
        "subject",
        "body"
      ])
      .from("posts")
      .innerJoin("users", "users.ID", "user_id")
      .innerJoin("skills", "skills.ID", "skill_id")
      .whereNull("reply_to_id")
      .go(function(err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      });
  },
  add: function (userId, skillId, body, cb) {
    query = new Query();
    query
      .insert(
        "posts",
        ["user_id", "skill_id", "body"],
        [userId, skillId, body]
      )
      .go(function(err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      });
  }
};

module.exports = post;