const Wordpos = require("wordpos");
const passport = require("../config/passport");
const db = require("../models");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log(JSON.stringify(req.user));
    res.json(req.user);
  });

  // Sign up a new user
  app.post("/api/signup", function (req, res) {
    db.user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }, function (err) {
      if (err) {
        return res.json(err);
      }
      res.redirect("/login");
    });
  });

  // Route for logging user out
  app.get("/api/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_info", function (req, res) {
    if (!req.user) {
      // The user is not logged in. Return an empty object
      return res.json({});
    }
    // Otherwise send back the user's username, email and id
    res.json({
      id: req.user.ID,
      username: req.user.username,
      email: req.user.email
    });
  });

  app.get("/api/skills", function (req, res) {
    db.skill.findAll(function (err, result) {
      if (err) {
        return res.status(401).send(err);
      }
      res.json(result);
    });
  });

  app.get("/api/answers/:postId", function (req, res) {
    db.answer.findForPost(req.params.postId, function (err, result) {
      if (err) {
        res.status(401).send(err);
      }
      res.json(result);
    });
  });

  app.post("/api/answers/:id", function ({ body }, res) {
    db.post.add({
      userId: req.body.userId,
      skillId: null,
      body: req.body.body,
      replyToId: req.body.replyToId
    },
      function (err) {
        if (err) {
          console.log(err);
          return res.status(401).send(err);
        }
        res.status(200).send(req.body);
      });
  });

  app.get("/api/posts", function (req, res) {
    db.post.findAll(function (err, result) {
      if (err) {
        return res.status(401).send(err);
      }
      res.json(result);
    });
  });

  app.post("/api/posts", function (req, res) {
    db.post.add({
      userId: req.body.userId,
      skillId: req.body.skillId,
      body: req.body.body
    },
      function (err) {
        if (err) {
          console.log(err);
          return res.status(401).send(err);
        }
        res.status(200).send(req.body);
      });
  });

  app.get("/api/namegen", function (req, res) {
    const wordpos = new Wordpos();
    wordpos.randAdjective(function (adj) {
      wordpos.randNoun(function (noun) {
        const username = adj[0].toUpperCase() + adj.slice(1) +
          noun[0].toUpperCase() + noun.slice(1) +
          (Math.floor(Math.random() * 100)).toString();
        res.send(username);
      });
    });
  });
};
