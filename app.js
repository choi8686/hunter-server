var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sequelize = require("./models").sequelize;
var passportConfig = require("./passport");
var session = require("express-session");
var bodyParser = require("body-parser");

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
sequelize.sync();

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET
  })
);

var passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
