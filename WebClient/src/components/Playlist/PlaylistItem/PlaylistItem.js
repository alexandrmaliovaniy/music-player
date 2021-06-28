import { useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faHeart } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {useHttp} from '../../../hooks/http.hook';
import './PlaylistItem.css';
import {UserPlaylistsContext} from '../../../context/UserPlaylistsContext';
import {AuthContext} from '../../../context/AuthContext';
import ContextMenu from '../../Modal/ContextMenu/ContextMenu';
import { PlayerContext } from '../../../context/PlayerContext';

const PlaylistItem = ({_playlistId, _id, songList, order, name, author, originalAuthor, originalImage, listenCount, length, originalPlaylist, favorite}) => {
    const { PlaySong, isPlaying, currentSong, TogglePlayer } = useContext(PlayerContext);
    const {request, GetAuth} = useHttp();
    const [contextMenu, setContextMenu] = useState(null);
    const {id} = useContext(AuthContext);
    const {userPlaylists} = useContext(UserPlaylistsContext);
    const [isFavorite, setFavorite] = useState(favorite);
    const songId = currentSong?.song._id;
    const playlistId = currentSong?.playlist;
    const thisPlaying = songId === _id && _playlistId === playlistId;
    const ToggleFavorite = useCallback(async() => {
        try {
            const newState = !isFavorite;
            await request(`/api/artist/favorite/${_id}/${newState}`, 'GET', null, GetAuth());
            setFavorite(newState);
        } catch(e) {
            console.log(e);
        }
    }, [isFavorite])

    const OnContextMenu = e => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY
        });
    }
    const contextMenuDisplay = contextMenu ?
    <ContextMenu title="Add to playlist" 
    options={ userPlaylists.filter(el => el.author === id) } 
    offset={contextMenu} 
    click={async(targetPlaylist) => {
        if (targetPlaylist == playlistId) return;
        try {
            await request(`/api/playlist/add`, "POST", {
                playlist: targetPlaylist,
                song: _id
            }, GetAuth())
        } catch(e) {
            console.log(e)
        }
    }}
    /> :
    "";

    return (
        <div className={`PlaylistItem ${thisPlaying ? "itemPlaying" : ""}`} onContextMenu={OnContextMenu} onClick={()=>setContextMenu(null)} onMouseLeave={()=>setContextMenu(null)} >
            <div className="itemOrder" onClick={()=> thisPlaying ? TogglePlayer() : PlaySong(songList, _playlistId, _id)}>
                <div className="itemOrderIndex">{order + 1}</div>
                <FontAwesomeIcon icon={thisPlaying && isPlaying ? faPause : faPlay} className="playItem" />
            </div>
            <div className="itemDescription">
                {originalPlaylist?.image || originalImage ? <img className="itemImage" src={originalPlaylist.image || originalImage} /> : ""}
            <div className="itemInfo">
                <div className="itemName">
                    {name}
                </div>
                {author || originalAuthor ? <Link to={`/author/${author._id}`} className="itemAuthor">{author?.username || originalAuthor?.username}</Link> : ""}
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
            {contextMenuDisplay}
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