const Chat = require("../models/chat");

const create = async (array) => {
  const encryptionKey = crypto.randomBytes(32).toString('hex');
  const chat = new Chat({
    usersInChat: array,
    messagesArray: [],
    encryptionKey
  });
  await chat.save();
};

const getUserChats = async (req, res) => {
  const chats = await Chat.find({ usersInChat: { $in: [req.params.userId] }})
  res.status(200).json({ chats: chats });
}

const returnHistory = async (req, res) => {
  console.log("chat hist")
  const currentChat = await Chat.findOne({ usersInChat: { $all: [req.body.sender, req.body.recipient] } });
  res.status(200).json({ chatId: currentChat._id, history: currentChat.messagesArray });
};

const sendMessage = async (req, res) => {
  console.log("Here");
  await Chat.findByIdAndUpdate(
    req.body.chatId,
    { $push: { messagesArray: req.body.message } }
  );
  res.status(201).json({ message: "OK" });
};

const ChatsController = {
  create,
  sendMessage,
  returnHistory,
  getUserChats
};

module.exports = ChatsController;
