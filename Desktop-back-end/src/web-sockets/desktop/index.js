let backendSocket = null;
const startSocket = () => {
  const app = require("express")();
  const http = require("http").Server(app);
  const io = require("socket.io")(http, {
    cors: {
      origin: "*",
      methods: ["*"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("newUser", (userName) => {
      io.emit("newUserAdmin", { userName, socketId: socket.id });
    });
    socket.on("userStartGame", () => {
      io.emit("startGame");
    });

    socket.on("first_player", (userName) => {
      io.emit("first_player_mobile", userName);
    });

    socket.on("newQuestion", (type) => {
      io.emit("newQuestion_mobile", type);
    });
    socket.on("newReponse", (response) => {
      io.emit("responseAdmin", response);
    });

    socket.on("disconnect", (reason) => {
      io.emit("deleteUserAdmin", { socketId: socket.id });
    });
  });

  http.listen(4000, function () {
    console.log("listening on port 4000");
  });
};

module.exports = { startSocket };
