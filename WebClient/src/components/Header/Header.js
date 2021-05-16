import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";

import './Header.css';
const Header = () => {
    return (
        <div className="Header">
            <div className="navigation">
                <div className="historyMove moveBack">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className="historyMove moveForward">
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
            </div>
            <div className="searchBlock">
                <input type="search" placeholder="song, artist name" className="searchInput" />
                <button className="searchButton">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    )
}
export default Header;