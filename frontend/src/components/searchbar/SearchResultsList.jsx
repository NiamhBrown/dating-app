import "./SearchResultsList.css";
import { SearchResult } from "../searchbar/SearchResults";

export const SearchResultsList = ({ results }) => {
    return (
        <div className="results-list">
            {results.map((result, id) => {
                return (
                    <div key={id}>
                        <SearchResult result= {result} />
                    </div>
                );
            })}
        </div>
    );
};