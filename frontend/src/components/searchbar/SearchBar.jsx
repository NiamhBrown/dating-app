import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getMatches } from "../../services/user";
import "./SearchBar.css";
import { getChats } from "../../services/chat";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");
    const [allMatches, setAllMatches] = useState([]);

    const fetchInitialData = async () => {
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");

        try {
            const results = await getChats(token, userId);
            setAllMatches(results.chats);
            setResults(results.chats);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (value) => {
        setInput(value);
        if (value === "") {
            setResults(allMatches);
        } else {
            const filteredResults = allMatches.filter((user) =>
                user.forename.toLowerCase().includes(value.toLowerCase()) ||
                user.lastName.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <div className="searchbar-input-wrapper">
            <FaSearch id="searchbar-search-icon" />
            <input
                className="searchbar-input" autoComplete="off" type="text" placeholder="Search matches..."
                value={input} onChange={(e) => handleChange(e.target.value)} />
        </div>
    )
}
