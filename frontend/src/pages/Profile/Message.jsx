import { useEffect, useState } from "react"
import "./message.css"
import { getOneUser } from "../../services/user";

export const Message = ({msg, index}) => {

    const [msgClass, setMC] = useState("")
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        getOneUser(token, userId).then((data) => {
            if (data.user.forename == msg.author)  {
                setMC("clart-user");
            } else {
                setMC("clart-other");
            }
          });
    }, [])
    
    return (
        <>
        <div className={msgClass}>
            <strong>{msg.author}:</strong><p > {msg.message}</p>
            <small className="timestamp"> ({msg.timestamp})</small>
        </div>
        </>
    )
}