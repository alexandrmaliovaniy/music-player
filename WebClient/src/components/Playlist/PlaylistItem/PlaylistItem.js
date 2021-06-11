import { useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faHeart } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {useHttp} from '../../../hooks/http.hook';
import './PlaylistItem.css';
import { PlayerContext } from '../../../context/PlayerContext';

const PlaylistItem = ({_playlistId, _id, order, name, author, listenCount, length, originalPlaylist, favorite}) => {
    const { PlaySong, isPlaying, currentSong, TogglePlayer } = useContext(PlayerContext);
    const {request, GetAuth} = useHttp();
    const [isFavorite, setFavorite] = useState(favorite);
    const songId = currentSong?.song._id;
    const playlistId = currentSong?.playlist;
    const thisPlaying = songId === _id && (_playlistId === playlistId || playlistId == originalPlaylist._id);
    const ToggleFavorite = useCallback(async() => {
        try {
            const newState = !isFavorite;
            await request(`/api/artist/favorite/${_id}/${newState}`, 'GET', null, GetAuth());
            setFavorite(newState);
        } catch(e) {
            console.log(e);
        }
    }, [isFavorite])

    return (
        <div className={`PlaylistItem ${thisPlaying ? "itemPlaying" : ""}`}>
            <div className="itemOrder" onClick={()=> thisPlaying ? TogglePlayer() : PlaySong(_playlistId || originalPlaylist._id, order)}>
                <div className="itemOrderIndex">{order + 1}</div>
                <FontAwesomeIcon icon={thisPlaying && isPlaying ? faPause : faPlay} className="playItem" />
            </div>
            <div className="itemDescription">
                {originalPlaylist?.image ? <img className="itemImage" src={originalPlaylist.image} /> : ""}
            <div className="itemInfo">
                <div className="itemName">
                    {name}
                </div>
                {author ? <Link to={`/author/${author._id}`} className="itemAuthor">{author.username}</Link> : ""}
            </div>
                
            </div>
            <div className="listenCount">
                {String(listenCount).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}
            </div>
            <div className={`heart ${isFavorite ? "favorite" : ""}`} onClick={ToggleFavorite}>
                <FontAwesomeIcon icon={faHeart} />
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
    favorite: PropTypes.bool,
    order: PropTypes.number.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    originalPlaylist: PropTypes.shape({
        _id: PropTypes.string,
        image: PropTypes.string
    }),
    author: {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    },
    listenCount: PropTypes.number.isRequired,
    length: PropTypes.string.isRequired
}


export default PlaylistItem;