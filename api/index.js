import http from "node:http";
import express from "express";
import path from "path";
import { Server } from "socket.io";

const __dirname = path.resolve();
const app = express();

const server = http.createServer(app);
const io = new Server(server);

// Socket.io

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
//   socket.on("chat message", (msg) => {
//     console.log("message:" + msg);
//     io.emit("chat message", msg);
//   });
// });

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// route middleware
// app.use("/api/auth");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
