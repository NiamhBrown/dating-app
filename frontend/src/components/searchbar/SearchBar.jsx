import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getMatches } from "../../services/user";
import "./SearchBar.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");
    const [allMatches, setAllMatches] = useState([]);

    const fetchInitialData = async () => {
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");

        try {
            const results = await getMatches(token, userId);
            setAllMatches(results.users);
            setResults(results.users);
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
                (user.forename +" "+ user.lastName).toLowerCase().includes(value.toLowerCase())
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
