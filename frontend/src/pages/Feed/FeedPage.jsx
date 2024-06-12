import { getUsers } from "../../services/user";
import User from "../../components/User/User";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FeedPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [position, setPosition] = useState(0);
    const [proficiencyFilter, setPF] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (token) {
        getUsers(token)
            .then((data) => {
            setUsers(data.users.filter((x) => x._id != userId));
            setFilteredUsers(data.users.filter((x) => x._id != userId));
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
    };

    const handlePF = (event) => {
        if (event.target.value == "unspecified") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter((x) => x.proficiencyLevel == event.target.value));
            setPF(event.target.value);
        }
    }

    return (
        <>
        <h2>Users</h2>
        <div className="feed" role="feed">
            <label htmlFor="proficiencyLevel">Proficiency Level:  </label>
            <select
            placeholder="ProficiencyLevel"
            id="proficiencyLevel"
            type="proficiencyLevel"
            value={proficiencyFilter}
            onChange={handlePF}
            >
            <option value="unspecified">Please select....</option>
            <option value="beginner">Beginner</option>
            <option value="junior">Junior</option>
            <option value="intermediate">Intermediate</option>
            <option value="senior">Senior</option>
            </select>


            {filteredUsers.length != 0 &&
            <User 
                user={filteredUsers[position]} 
                key={filteredUsers[position]._id}
                methods={[incriment, decriment]}
                requests={requests}
            />}
        </div>
        </>
    );
};

export default FeedPage;