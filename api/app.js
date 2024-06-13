const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Server = require("socket.io");
const { createServer } = require("http");
const path = require("path");

const usersRouter = require("./routes/users");
const authenticationRouter = require("./routes/authentication");
const tokenChecker = require("./middleware/tokenChecker");
const chatRouter = require("./routes/chats");
const ChatsController = require("./controllers/chats");

const app = express();
const server = createServer(app);
const io = Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/users", usersRouter);
app.use("/tokens", authenticationRouter);
app.use("/chat", chatRouter);

app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong" });
  }
});

// Socket.io connection 
io.on("connection", (socket) => {
  console.log("New client connected");

  // Joining a chat room
  socket.on("join", ({ chatId }) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  // Handling message sending
  socket.on("sendMessage", async ({ chatId, senderId, message }) => {
    const newMessage = await ChatsController.sendMessage(chatId, senderId, message);
    io.to(chatId).emit("receiveMessage", newMessage);  // Ensure event name matches frontend
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

module.exports = server;
