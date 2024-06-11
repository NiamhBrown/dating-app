import { getUsers } from "../../services/user";
import User from "../../components/User/User";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FeedPage = () => {
    const [users, setUsers] = useState([]);
    const [position, setPosition] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        getUsers(token)
            .then((data) => {
            setUsers(data.users);
            setPosition(0);
            // localStorage.setItem("token", data.token);
            })
            .catch((err) => {
            console.error(err);
            navigate("/login");
            });
        }
    }, [navigate]);

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    return (
        <>
        <h2>Users</h2>
        <div className="feed" role="feed">
            {users.length != 0 &&
            <User 
                user={users[position]} 
                key={users[position]._id}
                position={position}
                setPos={setPosition}
            />}
        </div>
        </>
    );
};