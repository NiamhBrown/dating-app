import "./SearchResultsList.css";
import { SearchResult } from "../searchbar/SearchResults";

export const SearchResultsList = (props) => {
    const results = props.results
    return (
        <div className="results-list">
            {results.map((result, id) => {
                return (
                    <div key={id}>
                        <SearchResult setChatting={props.setChatting} setChatterId={props.setChatterId} result={result} />
                    </div>
                );
            })}
        </div>
    );
};