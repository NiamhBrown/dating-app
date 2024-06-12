import { useNavigate } from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({ result }) => {
    const navigate = useNavigate ();

    const handleClick = () => {
        navigate(`/profile/${result._id}`); // change to link to chat
        window.location.reload();
    };
    
    return (
        <div
            className="search-result"
            onClick={handleClick}
        >
        {result.forename +' ' + result.lastName}
        </div>
    );
};

