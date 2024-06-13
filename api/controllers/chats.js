const Chat = require("../models/chat");

const create = async (sender, recipient) => {
  const chat = new Chat({
    usersInChat: [sender, recipient],
    messagesArray: []
  });
  await chat.save();
};

const sendMessage = async (chatId, senderId, message) => {
  const newMessage = { senderId, message, timestamp: new Date() }; // Add timestamp
  await Chat.findByIdAndUpdate(
    chatId,
    { $push: { messagesArray: newMessage } },
    { new: true }
  );
  return newMessage;
};

const ChatsController = {
  create,
  sendMessage
};

module.exports = ChatsController;
