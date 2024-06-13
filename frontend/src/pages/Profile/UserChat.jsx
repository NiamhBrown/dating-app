import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

export const UserChat = ({ chatId, userId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to the server
    socket.on("connect", () => {
      console.log("connected to server");
    });

    // Join the chat room
    socket.emit("join", { chatId });
    console.log(`Joining chat: ${chatId}`);

    // Listen for new messages
    socket.on("receiveMessage", (newMessage) => {
      console.log("Message received:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
    };
  }, [chatId]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(message);
    if (message.trim()) {
      const newMessage = { chatId, senderId: userId, message };
      socket.emit("sendMessage", newMessage);  // Ensure event name matches backend
      setMessage("");
    }
  };

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.senderId === userId ? "You" : "Them"}:</strong> {msg.message}
        </div>
      ))}
      <form onSubmit={sendMessage}>
        <label htmlFor="message">Write message:</label>
        <input
          id="message"
          type="text"
          value={message}
          onChange={handleMessageChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};
