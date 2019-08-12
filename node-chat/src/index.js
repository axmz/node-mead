const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("connected");
  const message = "Welcome";
  socket.emit("message", message);
});

app.use(express.static(path.join(__dirname, "../public")));

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
