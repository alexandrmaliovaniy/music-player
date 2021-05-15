import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import './Home.css';

const Home = () => {
    return (
        <div className="Home">
            <div className="playlistContainer">
                <div className="playlistSectionTitle">
                    Hello world
                </div>
                <div className="playlistSection">
                    <div className="playlistItem">
                        <div className="playlistDisplay">
                            <img className="playlistImg" width="200" height="200" />
                            <div className="playlistButton">
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                        </div>
                        <div className="playlistDescription">
                            <div className="playlistName">
                                Playlist name
                            </div>
                            <div className="playlistAuthor">
                                Playlist author
                            </div>
                        </div>
                    </div>
                    <div className="playlistItem">
                        <div className="playlistDisplay">
                            <img className="playlistImg" width="200" height="200" />
                            <div className="playlistButton">
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                        </div>
                        <div className="playlistDescription">
                            <div className="playlistName">
                                Playlist name
                            </div>
                            <div className="playlistAuthor">
                                Playlist author
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;