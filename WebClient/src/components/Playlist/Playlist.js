import PlaylistItem from './PlaylistItem/PlaylistItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import './Playlist.css';
import { useState } from 'react';

const Playlist = ({_id, list = [], favorites = []}) => {
    return (
        <div className="Playlist">
            <div className="playlistTableHead">
                <div className="alignCenter">#</div>
                <div>Name</div>
                <div className="alignRight">Listen Count</div>
                <div></div>
                <div className="alignRight"><FontAwesomeIcon icon={faClock} /></div>
            </div>
            {list.map((el, index) => {
                return <PlaylistItem {...el} _playlistId={_id} key={index} order={index} favorite={favorites.includes(el._id)} />
            })}
        </div>
    )
}
Playlist.protoTypes = {
    _id: PropTypes.string.isRequired,
    favorites: PropTypes.arrayOf(PropTypes.string),
    list: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string,
        author: {
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }.isRequired,
        listenCount: PropTypes.number.isRequired,
        length: PropTypes.string.isRequired
    }))
}

export default Playlist;