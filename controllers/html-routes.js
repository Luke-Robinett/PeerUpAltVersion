const path = require("path");

// Middleware for restricting pages based on authentication
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  // This is temporary, for testing api routes
  app.get("/test", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/api-test.html"));
  });

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/feed");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/feed");
    }
    res.redirect("/");
  });

  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/feed", isAuthenticated, function (req, res) {
    // Need to require our post model for dynamic view rendering of posts
    const post = require("../models/post");
    post.findAll(function (err, result) {
      if (err) {
        return res.status(401);
      }
      res.render("feed", { posts: result });
    });
  });

  app.get("/skills", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/skills1.html"));
  });
};
