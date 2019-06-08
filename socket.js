const models = require("./models");
const Op = models.Sequelize.Op;

const socket = function(socket) {
  console.log("a socket connected!");
  socket.on("message", msg => {
    socket.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnectied");
  });
};

module.exports = socket;

//HTML로 클라이언트를 먼저 작성
//server에서 session 처럼 socketio를 socketId : teamId
