const express = require("express");

const ChatsController = require("../controllers/chats")

const router = express.Router();

router.get("/:userId", ChatsController.getUserChats);
router.post("/:chat", ChatsController.returnHistory);
router.post("/", ChatsController.sendMessage);
router.get("/", ChatsController.sendMessage);

module.exports = router;
