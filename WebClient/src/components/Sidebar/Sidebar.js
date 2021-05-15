import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, Router, BrowserRouter} from 'react-router-dom'
import { faHeart, faHome, faPlus, faSearch, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import './Sidebar.css';


const SideBar = () => {
    return (
        <div className="Sidebar">
            <div className="navBar">
                <Link to="/home" className="menuItem activeMenuItem">
                    <FontAwesomeIcon icon={faHome} className="menuIcon" />
                    Home
                </Link>
                <Link to="/search" className="menuItem">
                    <FontAwesomeIcon icon={faSearch} className="menuIcon" />
                    Search
                </Link>
            </div>

            <div className="userOptions">
                <Link className="userOptionItem activeUserOptionItem">
                    <FontAwesomeIcon icon={faPlus} className="userOptionIcon" />
                    create new playlist
                </Link>
                <Link className="userOptionItem">
                    <FontAwesomeIcon icon={faHeart} className="userOptionIcon" />
                    favorite songs
                </Link>
            </div>
            <div className="playlists">
                <Link className="playlist">
                    Play list
                    <FontAwesomeIcon icon={faVolumeUp} className="playlistIcon" />
                </Link>
            </div>
        </div>
    )
}

export default SideBar;