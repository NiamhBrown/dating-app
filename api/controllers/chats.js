const Chat = require("../models/chat");

const create = async (sender, recipient) => {
    const chat = new Chat({
        usersInChat: [sender, recipient],
        messagesArray: []
    });
    chat.save();
};

const sendMessage = async (req, res) => {
    await Chat.findOneAndUpdate({
        usersInChat: { $all: [req.sender, req.recipient] }
    }, {
        $push: { messagesArray: req.message }
    });
    res.status(201).json({ message: "Chat sent" });
};

const ChatsController = {
    create: create,
    sendMessage: sendMessage
  };
  
module.exports = ChatsController;