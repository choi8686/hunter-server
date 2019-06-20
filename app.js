//라이브러리 모음
var createError = require("http-errors");
var express = require("express");
const indexRouter = require("./routes/index");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var sequelize = require("./models").sequelize;
var passportConfig = require("./passport");
var session = require("express-session");

var models = require("./models");
require("dotenv").config(); // .env에 모아둔 비밀키를 읽어 process.env 객체에 넣음.

var app = express();
sequelize.sync(); //sequelize 연결

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

var server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중"); //server listen
});

var io = require("socket.io").listen(server);

io.on("connection", socket => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("leaveRoom", data => {
    socket.leave(data.uuid, () => {
      io.to(data.uuid).emit("leaveRoom", data);
    });
  });

  socket.on("joinRoom", data => {
    socket.join(data.uuid, () => {
      console.log(data.myTeamName + " join a " + data.uuid);
      io.to(data.uuid).emit("joinRoom", data);
    });
  });

  socket.on("chat message", msg => {
    models.Message.create({
      myTeamId: msg.myTeamId,
      teamId: msg.teamId,
      text: msg.text,
      uuid: msg.uuid
    });
    io.to(msg.uuid).emit("chat message", msg);
  });
});
