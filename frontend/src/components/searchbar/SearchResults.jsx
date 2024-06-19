import "./SearchResult.css";

export const SearchResult = (props) => {
    const result = props.result
    const handleClick = () => {
        props.setChatting(true);
        props.setChatterId(result);
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

