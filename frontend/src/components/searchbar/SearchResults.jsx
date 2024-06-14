import { useNavigate } from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({ result }) => {
    const navigate = useNavigate ();

    const handleClick = () => {
        navigate() // add chat url
        // navigate(`/profile/${result._id}`);
        // window.location.reload();
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

