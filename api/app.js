const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
<<<<<<< HEAD
const socketIo = require("socket.io");
const { createServer } = require("http");
=======
const path = require('path');
>>>>>>> main

const usersRouter = require("./routes/users");
const authenticationRouter = require("./routes/authentication");
const tokenChecker = require("./middleware/tokenChecker");
const chatRouter = require("./routes/chats");
const Chat = require("./models/chat");

const app = express();
const server = createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Allow requests from any client
// docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// docs: https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

// Parse JSON request bodies, made available on `req.body`
app.use(bodyParser.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API Routes
app.use("/users", usersRouter);
app.use("/tokens", authenticationRouter);
app.use("/chat", chatRouter);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong" });
  }
});

//socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", ({ chatId }))
  console.log(` User joined chat ${chatId}`);
})

socket.on("sendMessage", )
module.exports = app;
