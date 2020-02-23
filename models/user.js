const Query = require("../config/query");

const user = {
    findAll: function (cb) {
        const query = new Query();
        query.select(["ID", "username"])
            .from("users")
            .go(function (err, result) {
                if (err) {
                    return cb(err);
                }
                cb(null, result);
            });
    },
    findById: function (id, cb) {
        query = new Query();
        query.select(["ID", "username"])
            .from("users")
            .whereEqual("ID", id)
            .go(function (err, result) {
                if (err) {
                    return cb(err);
                }
                cb(null, result);
            });
    },
    findByUsername: function (username, cb) {
        const query = new Query();
        query.select(["ID", "username"])
            .from("users")
            .whereEqual("username", username.trim())
            .go(function (err, result) {
                if (err) {
                    return cb(err);
                }
                cb(null, result);
            });
    },
    findByEmail: function (email, cb) {
        const query = new Query();
        query.select(["ID", "username", "email", "password"])
            .from("users")
            .whereEqual("email", email.trim())
            .limit(1)
            .go(function (err, result) {
                if (err) {
                    return cb(err);
                }
                let data = (result.length > 0) ? result[0] : null;
                cb(null, data);
            });
    },
    validateLogin: function (credentials, cb) {
        this.findByEmail(credentials.email, function (err, result) {
            if (err) {
                return cb(err);
            }
            cb(null, result);
        });
    },
    create: function (newUser, cb) {
        const query = new Query();
        query.insert("users",
            ["username", "email", "password"],
            [newUser.username, newUser.email, newUser.password])
            .go(function (err, result) {
                if (err) {
                    return cb(err);
                }
                cb(null, result);
            });
    }
};

module.exports = user;
