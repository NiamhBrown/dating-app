const Chat = require("../models/chat");
const crypto = require('crypto');

const create = async (sender, recipient) => {
  const encryptionKey = crypto.randomBytes(32).toString('hex');
  const chat = new Chat({
    usersInChat: [sender, recipient],
    messagesArray: [],
    encryptionKey
  });
  await chat.save();
  console.log(encryptionKey);
};

const returnHistory = async (req, res) => {
  console.log("chat hist");
  const currentChat = await Chat.findOne({ usersInChat: { $all: [req.body.sender, req.body.recipient] } });
  if (!currentChat) {
    res.status(404).json({ message: "Chat not found" });
    return;
  }
  res.status(200).json({ chatId: currentChat._id, history: currentChat.messagesArray, encryptionKey: currentChat.encryptionKey });
};

const sendMessage = async (req, res) => {
  console.log(req.body);
  await Chat.findByIdAndUpdate(
    req.body.chatId,
    { $push: { messagesArray: req.body.message } }
  );
  res.status(201).json({ message: "OK" });
};

const ChatsController = {
  create,
  sendMessage,
  returnHistory
};

module.exports = ChatsController;
