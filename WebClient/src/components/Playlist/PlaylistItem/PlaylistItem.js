import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import './PlaylistItem.css';
import { PlayerContext } from '../../../context/PlayerContext';

const PlaylistItem = ({_playlistId, _id, order, name, author, listenCount, length, image}) => {

    const { PlaySong, isPlaying, currentSong, TogglePlayer } = useContext(PlayerContext);

    const songId = currentSong?.song._id;
    const playlistId = currentSong?.playlist;

    const thisPlaying = songId === _id && _playlistId === playlistId;
    return (
        <div className={`PlaylistItem ${thisPlaying ? "itemPlaying" : ""}`}>
            <div className="itemOrder" onClick={()=> thisPlaying ? TogglePlayer() : PlaySong(_playlistId, order)}>
                <div className="itemOrderIndex">{order + 1}</div>
                <FontAwesomeIcon icon={thisPlaying && isPlaying ? faPause : faPlay} className="playItem" />
            </div>
            <div className="itemDescription">
                {image ? <img className="itemImage" src={image} /> : ""}
            <div className="itemInfo">
                    <div className="itemName">
                        {name}
                    </div>
                    {author ? <Link to={`/author/${author._id}`} className="itemAuthor">{author.name}</Link> : ""}
                </div>
                
            </div>
            <div className="listenCount">
                {String(listenCount).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}
            </div>
            <div className="itemLength">
                {length}
            </div>
        </div>
    )
}

PlaylistItem.protoTypes = {
    _playlistId: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    author: {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    },
    listenCount: PropTypes.number.isRequired,
    length: PropTypes.string.isRequired
}


export default PlaylistItem;