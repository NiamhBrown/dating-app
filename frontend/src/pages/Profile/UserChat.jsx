import { useState, useEffect } from "react";
import io from "socket.io-client";
import { getHistory, sendMessageToDB } from "../../services/chat";
import { getOneUser } from "../../services/user";
import UnmatchButton from "../../components/UnmatchButton";
import BlockButton from "../../components/BlockButton";
import CryptoJS from "crypto-js";
import ProfilePicture from "../../components/ProfilePicture";
import { useNavigate } from "react-router-dom";
import { Message } from "./Message";

const socket = io(import.meta.env.VITE_BACKEND_URL);

export const UserChat = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [CID, setCID] = useState(); //CID=chat room id
  const userId = localStorage.getItem("userId");
  const [encryptionKey, setEncryptionKey] = useState("");
  const token = localStorage.getItem("token");
  const sender = localStorage.getItem("userId");
  const recipient = props.chatterId;
  const [recipientData, setRecipientData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistory(token, sender, recipient);
        if (data.encryptionKey) {
          setEncryptionKey(data.encryptionKey);
          const decryptedHistory = data.history.map((msg) => {
            const bytes = CryptoJS.AES.decrypt(msg.message, data.encryptionKey);
            const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
            return { ...msg, message: originalMessage };
          });
          console.log(data.chatId);
          setMessages(decryptedHistory);
          setCID(data.chatId);
          socket.emit("join room", data.chatId);
        } else {
          console.error("encryption key not found in response");
        }
      } catch (error) {
        console.error("error fetching chat history", error);
      }
    };

    fetchData();

    getOneUser(token, recipient).then((data) => {
      console.log("recipient data!!", data);
      console.log("forname!!", data.user.forename);
      setRecipientData(data.user);
      // console.log("recipietName !!", recipientName);
    });

    getOneUser(token, userId).then((data) => {
      setName(data.user.forename);
    });

    socket.on("message", (msg) => {
      if (!encryptionKey) {
        console.error("Encryption key is not set");
        return;
      }
      console.log("Message posted");
      console.log(msg);
      const bytes = CryptoJS.AES.decrypt(msg.message, encryptionKey);
      const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...msg, message: originalMessage },
      ]);
    });

    socket.on("dm room joined", () => {
      console.log("Room ID: ", CID);
    });

    return () => {
      socket.off("message");
      socket.off("dm room joined");
    };
  }, [token, sender, recipient, encryptionKey]);

  const sendMessage = () => {
    if (message.trim() && encryptionKey) {
      console.log(CID);
      let today = new Date().toLocaleString();
      let encryptedMessage = CryptoJS.AES.encrypt(
        message,
        encryptionKey
      ).toString();
      let message_obj = {
        author: name,
        message: encryptedMessage,
        timestamp: today,
      };
      socket.emit("message", message_obj, CID);
      setMessage("");
      sendMessageToDB(token, CID, message_obj);
    } else {
      console.error("Message is empty or encryption key is not set");
    }
  };

  const closeChat = () => {
    props.setChatting(false);
  };

  const handleProfile = () => {
    props.setCheckProfile(true);
    // navigate(`/profile/${recipient}`);
  };
  return (
    <div>
      <div onClick={handleProfile}>
        {" "}
        <ProfilePicture
          userId={recipient} // 
          className="profilePicture"
          size="75px"
        />
      </div>
      <div onClick={handleProfile}>{recipientData.forename}</div>
      <div>
          <UnmatchButton user={sender} otherUser={recipient} />
          <BlockButton user={sender} otherUser={recipient} />
        </div>
      <div>
        <div
          style={{
            padding: "10px",
            height: "650px",
            width: "1200px",
            overflowY: "scroll",
          }}
        >
        {messages.map((msg, index) => (
            <Message msg={msg} key={index}/>
        ))}
      </div>
      </div>
      <textarea
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          marginTop: "5px", 
          padding: "10px",
          height: "50px",
          width: "1200px",
          borderRadius: "7px",
          resize: "none",
          border:"transparent"
        }}
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={closeChat}>Close Chat</button>
    </div>
  );
};
