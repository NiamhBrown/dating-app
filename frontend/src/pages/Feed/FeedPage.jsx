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
                const filterConditions = (user) => {
                    return (user._id != userId && !current_user.blackList.includes(user._id) && !current_user.matches.includes(user._id)
                    && !user.matchRequests.includes(current_user._id))
                }
            const current_user = data.users.filter((user) => user._id == userId)[0];
            const other_users = data.users.filter((user) => filterConditions(user))
            
            console.log("CURRENT USER:",current_user)
            console.log("OTHER USER:",other_users)
            if (current_user.lookingFor.proficiencyLevel == "") {
                console.log("OTHER USER:",other_users)
                setUsers(other_users)
            }
            else if (current_user.lookingFor.proficiencyLevel) {

            setUsers(other_users.filter((x)=> x.proficiencyLevel == current_user.lookingFor.proficiencyLevel))

            }
            setPosition(0);
            setRequests(current_user.matchRequests);

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
    };

    return (
        <>
        <div>
            {users.length != 0 &&
            <User 
                user={users[position]} 
                key={users[position]._id}
                methods={[incriment, decriment]}
                requests={requests}
            />}

            {users.length == 0 && 
            <p>No new users</p>}
        </div>
        </>
    );
};

export default FeedPage;