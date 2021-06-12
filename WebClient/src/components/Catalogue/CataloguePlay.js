import { faArrowDown, faPlay, faPause } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './CataloguePlay.css';
import {useContext} from 'react';
import {PlayerContext} from "../../context/PlayerContext";
import PropTypes from 'prop-types';

const CataloguePlay = ({artistId, playlistId}) => {

    const {currentSong, isPlaying, PlayPlaylist, TogglePlayer } = useContext(PlayerContext);
    const thisPlaying = currentSong?.playlist === playlistId;
    const button = artistId ?
    <button className="followBtn">
        follow
    </button>
    :
    <button className="downloadBtn">
        <FontAwesomeIcon icon={faArrowDown} />
    </button>

    return (
        <div className="CataloguePlay">
            <div className="cataloguePlayBtn" onClick={()=> thisPlaying ? TogglePlayer() : PlayPlaylist(playlistId) }>
                <FontAwesomeIcon icon={isPlaying && thisPlaying ? faPause : faPlay}  />
            </div>
            {button}
        </div>
    )
}
CataloguePlay.protoTypes = {
    artistId: PropTypes.string.isRequired,
    playlistId: PropTypes.string.isRequired
}

export default CataloguePlay;