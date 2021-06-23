import { faArrowDown, faPlay, faPause, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './CataloguePlay.css';
import {useContext, useState, useEffect} from 'react';
import {PlayerContext} from "../../context/PlayerContext";
import {UserPlaylistsContext} from "../../context/UserPlaylistsContext";
import PropTypes from 'prop-types';
import { useHttp } from "../../hooks/http.hook";

const CataloguePlay = ({authorId, playlistId, playlistName}) => {

    const {request, GetAuth} = useHttp();
    const {currentSong, isPlaying, PlayPlaylist, TogglePlayer } = useContext(PlayerContext);
    const thisPlaying = currentSong?.playlist === playlistId;
    const {userPlaylists, setUserPlaylists} = useContext(UserPlaylistsContext)
    const [followed, setFollow] = useState(null)



    useEffect(() => {
        if (!userPlaylists) return;
        setFollow(userPlaylists.find((el) => {
            return el._id === playlistId;
        }))
    }, [userPlaylists, playlistId])

    // const button = artistId ?
    // <button className="followBtn">
    //     follow
    // </button>
    // :
    // <button className="downloadBtn">
    //     <FontAwesomeIcon icon={faArrowDown} />
    // </button>
  

    const ToggleFollow = async() => {
        try {
            await request(`/api/artist/subscribe/`, "POST", {
                playlistId,
                subscribe: !followed
            }, GetAuth());
            if (!followed) {
                console.log({
                    _id: playlistId,
                    author: authorId,
                    name: playlistName
                })
                setUserPlaylists([
                    ...userPlaylists,
                    {
                        _id: playlistId,
                        author: authorId,
                        name: playlistName
                    }
                ])
            } else {
                setUserPlaylists(userPlaylists.filter(el => {
                    return el._id != playlistId
                }))
            }
            setFollow(!followed);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="CataloguePlay">
            <div className="cataloguePlayBtn" onClick={()=> thisPlaying ? TogglePlayer() : PlayPlaylist(playlistId) }>
                <FontAwesomeIcon icon={isPlaying && thisPlaying ? faPause : faPlay}  />
            </div>
            <div className={`heart ${followed ? "unfollow" : "follow"}`} onClick={ToggleFollow} >
                <FontAwesomeIcon icon={faHeart} />
            </div>
        </div>
    )
}
CataloguePlay.protoTypes = {
    artistId: PropTypes.string.isRequired,
    playlistId: PropTypes.string.isRequired
}

export default CataloguePlay;