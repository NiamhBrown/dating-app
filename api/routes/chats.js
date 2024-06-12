const express = require("express");

const ChatsController = require("../controllers/chats")

const router = express.Router();

router.post("/send", ChatsController.sendMessage)

module.exports = router;
