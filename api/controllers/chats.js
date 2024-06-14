const Chat = require("../models/chat");

const create = async (sender, recipient) => {
  const chat = new Chat({
    usersInChat: [sender, recipient],
    messagesArray: []
  });
  await chat.save();
};

const returnHistory = async (req, res) => {
  console.log("chat hist")
  const currentChat = await Chat.findOne({ usersInChat: { $all: [req.body.sender, req.body.recipient] } });
  res.status(200).json({ chatId: currentChat._id, history: currentChat.messagesArray });
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
