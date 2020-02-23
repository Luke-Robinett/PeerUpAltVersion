const Query = require("../config/query");

const skill = {
  findAll: function (cb) {
    const query = new Query();
    query.select(["ID", "subject"])
      .from("skills")
      .go(function(err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      });
  }
};

module.exports = skill;