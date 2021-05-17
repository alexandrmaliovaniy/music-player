import PlaylistItem from './PlaylistItem/PlaylistItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import './Playlist.css';
import { useState } from 'react';

const Playlist = ({list}) => {
    return (
        <div className="Playlist">
            <div className="playlistTableHead">
                <div className="alignCenter">#</div>
                <div>Name</div>
                <div className="alignRight">Listen Count</div>
                <div className="alignRight"><FontAwesomeIcon icon={faClock} /></div>
            </div>
            {list.map((el, index) => {
                return <PlaylistItem {...el} key={index} order={index} />
            })}
        </div>
    )
}
Playlist.protoTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
        name: PropTypes.string,
        author: {
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }.isRequired,
        listenCount: PropTypes.number.isRequired,
        length: PropTypes.string.isRequired
    }))
}

export default Playlist;