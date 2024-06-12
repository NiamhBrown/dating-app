import { FaSearch } from "react-icons/fa";
import { useEffect, useState} from "react";
import { getMatches } from "../../services/user";
import "./SearchBar.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");

    const fetchData = async (value) => {
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");

        if (value === "") {
            try {
                const results = await getMatches(token, userId);
                setResults(results.users);
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const response = await fetch(`${BACKEND_URL}/users/matches/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const json = await response.json();
                const results = json.users.filter((user) => 
                    user.forename.toLowerCase().includes(value.toLowerCase()) || 
                    user.lastName.toLowerCase().includes(value.toLowerCase())
                );
                setResults(results);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    useEffect(() => {
        fetchData(""); 
    }, []);

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                id="searchinput" autoComplete="off" type="text" placeholder="Search matches..." 
                value={input}  onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}