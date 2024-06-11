import { getUsers } from "../../services/user";
import User from "../../components/User/User";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FeedPage = () => {
    const [users, setUsers] = useState([]);
    const [user_pos, setUserPos] = useState(0);
    const navigate = useNavigate();
    setUserPos(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        getUsers(token)
            .then((data) => {
            setUsers(data.users);
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
            <User user={users[user_pos]} key={users[user_pos]._id} position={user_pos} setPos={setUserPos} />
        </div>
        </>
    );
};