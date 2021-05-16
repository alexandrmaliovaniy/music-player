import { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { CurrentPageContext } from '../../context/CurrentPageContext';
import {useHistory} from 'react-router-dom';
import './Header.css';
const Header = () => {

    const {currentPage} = useContext(CurrentPageContext);
    const history = useHistory();


    const searchbar = currentPage === 1 ?
    <div className="searchBlock">
        <input type="search" placeholder="song, artist name" className="searchInput" />
        <button className="searchButton">
            <FontAwesomeIcon icon={faSearch} />
        </button>
    </div>
    :
    "";

    return (
        <div className="Header">
            <div className="navigation">
                <div className="historyMove moveBack" onClick={history.goBack}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className="historyMove moveForward" onClick={history.goForward}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
            </div>
            {searchbar}
        </div>
    )
}
export default Header;