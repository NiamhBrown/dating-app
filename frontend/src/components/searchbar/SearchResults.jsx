import { useNavigate } from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = (props) => {
    const navigate = useNavigate ();
    const result = props.result
    const handleClick = () => {
        props.setChatting(true);
        props.setChatterId(result._id);
        //navigate() // add chat url
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

