import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import './Searchbar.css';
const Searchbar = () => {
    return (
        <div className="Searchbar">
            <div className="searchBlock">
                <input type="search" placeholder="song, artist name" className="searchInput" />
                <button className="searchButton">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    )
}
export default Searchbar;