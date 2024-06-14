import { getUsers } from "../../services/user";
import User from "../../components/User/User";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FeedPage = () => {
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [position, setPosition] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (token) {
        getUsers(token)
            .then((data) => {
            setUsers(data.users.filter((x) => x._id != userId));
            setPosition(0);
            const current_user = data.users.filter((x) => x._id == userId);
            setRequests(current_user[0].matchRequests);
            // localStorage.setItem("token", data.token);
            })
            .catch((err) => {
            console.error(err);
            navigate("/login");
            });
        }
    }, [navigate]);

    const incriment = () => {
        if (position < users.length - 1) {
            setPosition(position + 1);
        } else {
            setPosition(0);
        }
    };

    const decriment = () => {
        if (position > 0) {
            setPosition(position - 1);
        }
    };

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    return (
        <>
        {/* <h2>Users</h2> */}
        <div>
            {users.length != 0 &&
            <User 
                user={users[position]} 
                key={users[position]._id}
                methods={[incriment, decriment]}
                requests={requests}
            />}
        </div>
        </>
    );
};

export default FeedPage;