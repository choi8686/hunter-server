const socket = function(socket) {
  socket.on("connection", function(socket) {
    console.log("a user connected");
  });
  socket.on("message", msg => {
    console.log("fuck", msg);
    socket.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnectied");
  });
};

module.exports = socket;
