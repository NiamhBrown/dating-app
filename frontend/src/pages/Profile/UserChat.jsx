import { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io(import.meta.env.VITE_BACKEND_URL);

export const UserChat = (chatId, userId) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect (() => {
        socket.on("connect", () => {
            console.log("connected to server");
        });
    }, []);


    // //listen for new messages
    // socket.on("receiveMEssage", (newMessage) =>{
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
        <>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio soluta consequuntur voluptas fuga. Ullam illum officiis quis optio provident, molestiae reprehenderit excepturi fuga repudiandae quam, veniam accusantium temporibus possimus qui.
        </>
    )
}