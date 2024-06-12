import "./SearchResultsList.css";
import { SearchResult } from "../searchbar/SearchResults";

export const SearchResultsList = ({ results }) => {
    return (
        <div className="results-list">
            {results.map((result, id) => {
                return (
                    <div key={id}>
                        {/* <SearchResult FORENAME={result.forename} SURNAME={result.lastName} userid = {result._id} /> */}
                        <SearchResult result= {result} />
                    </div>
                );
            })}
        </div>
    );
};