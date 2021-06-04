import React, {useContext} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, Router, BrowserRouter} from 'react-router-dom'
import { CurrentPageContext } from '../../context/CurrentPageContext';
import { faDownload, faHeart, faHome, faPlus, faSearch, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import './Sidebar.css';


const SideBar = () => {

    const {currentPage} = useContext(CurrentPageContext);

    function IsActive(id) {
        return id === currentPage ? "menuItem activeMenuItem" : "menuItem";
    }


    return (
        <div className="Sidebar">
            <div className="navBar">
                <Link to="/home" className={IsActive(0)}>
                    <FontAwesomeIcon icon={faHome} className="menuIcon" />
                    Home
                </Link>
                <Link to="/search" className={IsActive(1)}>
                    <FontAwesomeIcon icon={faSearch} className="menuIcon" />
                    Search
                </Link>
            </div>

            <div className="userOptions">
                <Link to="/newplaylist" className={`userOptionItem activeUserOptionItem ${IsActive(2)}`}>
                    <FontAwesomeIcon icon={faPlus} className="userOptionIcon" />
                    create new playlist
                </Link>
                <Link to="/" className="userOptionItem">
                    <FontAwesomeIcon icon={faHeart} className="userOptionIcon" />
                    favorite songs
                </Link>
                <Link to="/" className="userOptionItem">
                    <FontAwesomeIcon icon={faDownload} className="userOptionIcon" />
                    downloads
                </Link>
            </div>
            <div className="playlists">
                <Link to="/" className="playlist">
                    Play list
                    <FontAwesomeIcon icon={faVolumeUp} className="playlistIcon" />
                </Link>
            </div>
        </div>
    )
}

export default SideBar;