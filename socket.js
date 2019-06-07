module.exports = io => {
  io.on("connection", socket => {
    // 웹소켓 연결 시
    console.log("Socket initiated!");
    socket.on("newScoreToServer", data => {
      // 클라이언트에서 newScoreToServer 이벤트 요청 시
      console.log("Socket: newScore");
      io.emit("newScoreToClient", data);
    });
  });
};

io.on("connection", socket => {
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

var socket = io.connect("서버 주소");
socket.on("서버에서 받을 이벤트명", function(데이터) {
  // 받은 데이터 처리
  socket.emit("서버로 보낼 이벤트명", 데이터);
});
