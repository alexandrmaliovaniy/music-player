import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from 'react-router-dom';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import {useContext} from 'react';
import { PlayerContext } from "../../../context/PlayerContext";
import './CatalogueItem.css';
const CatalogueItem = ({_id, name, author, image}) => {
    const {isPlaying, currentSong, TogglePlayer, PlaySong} = useContext(PlayerContext);
    const thisPlaying = currentSong?.playlist === _id;
    const history = useHistory();
    
    const Play = (e) => {
        e.preventDefault();
        thisPlaying ? TogglePlayer() : PlaySong(_id, 0)
    }

    return (
        <Link to={`/playlist/${_id}`} className="CatalogueItem">
            <div className="catalogueItemDisplay">
                <img
                className="catalogueItemImg"
                width="200"
                height="200"
                src={image}
                alt={`Playlist name: ${name}, Author: ${author.username}`}
                />
                <div className="catalogueItemButton" onClick={Play}>
                    <FontAwesomeIcon icon={isPlaying && thisPlaying ? faPause: faPlay} />
                </div>
            </div>
            <div className="catalogueItemDescription">
                <div className="catalogueItemName">
                    {name}
                </div>
                <div className="catalogueItemAuthor" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    history.push(`/author/${author._id}`);
                }}>
                    {
                    author.username
                    }
                </div>
            </div>
        </Link>
    );
}

CatalogueItem.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.shape({
        _id: PropTypes.string,
        username: PropTypes.string
    }).isRequired,
    image: PropTypes.string.isRequired
}

export default CatalogueItem;