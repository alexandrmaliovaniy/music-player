import React, {useContext, useState, useEffect, useCallback} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, Router, BrowserRouter} from 'react-router-dom'
import { CurrentPageContext } from '../../context/CurrentPageContext';
import { UserPlaylistsContext } from '../../context/UserPlaylistsContext';
import { faDownload, faHeart, faHome, faPlus, faSearch, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../../context/AuthContext';
import { PlayerContext } from '../../context/PlayerContext';
import { useHttp } from '../../hooks/http.hook';
import './Sidebar.css';


const SideBar = () => {

    const {currentPage} = useContext(CurrentPageContext);
    const {userPlaylists, setUserPlaylists} = useContext(UserPlaylistsContext);
    const {currentSong} = useContext(PlayerContext);
    const {id} = useContext(AuthContext);
    const {request, GetAuth} = useHttp()
    const IsActive = (id) => {
        return id === currentPage ? "activeMenuItem" : "";
    }

    const GetPlaylists = async() => {
        try {
            const data = await request(`/api/artist/subplaylists/${id}`, "GET", null, GetAuth());
            setUserPlaylists(data);
        } catch(e) {
            console.log(e)            
        }
    }
    useEffect(() => {
        if (!id) return;
        GetPlaylists();
    }, [id])
    return (
        <div className="Sidebar">
            <div className="navBar">
                <Link to="/home" className={`menuItem ${IsActive(0)}`}>
                    <FontAwesomeIcon icon={faHome} className="menuIcon" />
                    Home
                </Link>
                <Link to="/search" className={`menuItem ${IsActive(1)}`}>
                    <FontAwesomeIcon icon={faSearch} className="menuIcon" />
                    Search
                </Link>
            </div>

            <div className="userOptions">
                <Link to="/newplaylist" className={`userOptionItem activeUserOptionItem ${IsActive(2)}`}>
                    <FontAwesomeIcon icon={faPlus} className="userOptionIcon" />
                    create new playlist
                </Link>
                <Link to="/favorites" className={`userOptionItem ${IsActive(3)}`}>
                    <FontAwesomeIcon icon={faHeart} className="userOptionIcon" />
                    favorite songs
                </Link>
                <Link to="/" className="userOptionItem">
                    <FontAwesomeIcon icon={faDownload} className="userOptionIcon" />
                    downloads
                </Link>
            </div>
            <div className="playlists">
                {
                    userPlaylists.map(el => {
                        return (
                            <div 
                            key={el._id}
                            className={`playlist ${IsActive(el._id)} ${currentSong?.playlist == el._id ? "activePlaylist" : ""}`}>
                                <Link to={`/playlist/${el._id}`} className="playlistLink" >
                                    {el.name}
                                </Link>
                                <FontAwesomeIcon icon={faVolumeUp} className="playlistIcon" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SideBar;