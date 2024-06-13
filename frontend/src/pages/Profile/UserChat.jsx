import { css } from "@emotion/react";
import { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io(import.meta.env.VITE_BACKEND_URL);

export const UserChat = (chatId, userId) => {
    const [message, setMessage] = useState("");
    const [test, setTest] = useState(false)

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connect");
        });
    }, []);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
      };

    const sendMessage = (event) => {
        event.preventDefault();
        // console.log(message);
        socket.emit("message posted");
        setTest(true);
    };


    // //listen for new messages
    // socket.on("receiveMessage", (newMessage) =>{
    //     setMessage((prevMessages) => [prevMessages, newMessage] )
    // })

    // //sending a new message
    // const sendMessage = () => {
    //     if (MessageChannel.trim()) {
    //         const newMessage = {chatId, senderId: userId, message};
    //         socket.emit("sendMessage", newMessage)
    //         setMessage("")
    //     }
    // }


    return (
        <div>
            {/* {messages.map((msg,index) => {
                <div key={index}>
                    <strong>{msg.senderId === userId ? "You" : "Them"}: </strong> {msg.message}
                </div>
            })} */}
            <form onSubmit={sendMessage}>
                <label htmlFor="email">Write message:</label>
                <input
                id="message"
                type="text"
                value={message}
                onChange={handleMessageChange}
                />
                <input role="submit-button" id="submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}