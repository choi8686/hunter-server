<<<<<<< HEAD
const socket = function(socket) {
  socket.on("connection", function(socket) {
    console.log("a user connected");
  });
  socket.on("message", msg => {
    console.log("fuck", msg);
=======
const models = require("./models");
const Op = models.Sequelize.Op;

const socket = function(socket) {
  console.log("a socket connected!");
  socket.on("message", msg => {
>>>>>>> 9da6e102851a6eac9cfca8484ecde0447e7e682f
    socket.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnectied");
  });
};

module.exports = socket;
<<<<<<< HEAD
=======

//HTML로 클라이언트를 먼저 작성
//server에서 session 처럼 socketio를 socketId : teamId
>>>>>>> 9da6e102851a6eac9cfca8484ecde0447e7e682f
