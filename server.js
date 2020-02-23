const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const db = require("./models");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

// express & Passport middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);

app.listen(PORT, function () {
  console.log("App now listening at localhost:" + PORT);
  });
