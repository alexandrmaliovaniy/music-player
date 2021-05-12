import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import './Sidebar.css';


const SideBar = () => {
    return (
        <div className="Sidebar">
            <ul className="navBar">
                <li className="menuItem activeMenuItem">
                    <FontAwesomeIcon icon={faHome} className="menuIcon" />
                    Home
                </li>
                <li className="menuItem">
                    <FontAwesomeIcon icon={faSearch} className="menuIcon" />
                    Search
                </li>
            </ul>

            <ul className="userOptions">
                <li className="userOptionItem activeUserOptionItem">
                    <FontAwesomeIcon icon={faPlus} className="userOptionIcon" />
                    create new playlist
                </li>
                <li className="userOptionItem">
                    <FontAwesomeIcon icon={faHeart} className="userOptionIcon" />
                    favorite songs
                </li>
            </ul>

            <div className="playlists">
                
            </div>
        </div>
    )
}

export default SideBar;