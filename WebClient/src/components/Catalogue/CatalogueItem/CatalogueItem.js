import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from 'react-router-dom';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import {useContext} from 'react';
import { PlayerContext } from "../../../context/PlayerContext";
import './CatalogueItem.css';
const CatalogueItem = ({_id, name, author, image}) => {
    const {isPlaying, currentSong} = useContext(PlayerContext);
    const thisPlaying = currentSong?.playlist === _id;
    const history = useHistory();
    
    return (
        <Link to={`/playlist/${_id}`} className="CatalogueItem">
            <div className="catalogueItemDisplay">
                <img
                className="catalogueItemImg"
                width="200"
                height="200"
                src={image}
                alt={`Playlist name: ${name}, Author: ${author}`}
                />
                <div className="catalogueItemButton" onClick={(e)=>e.preventDefault()}>
                    <FontAwesomeIcon icon={thisPlaying ? faPause: faPlay} />
                </div>
            </div>
            <div className="catalogueItemDescription">
                <div className="catalogueItemName">
                    {name}
                </div>
                <div className="catalogueItemAuthor" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    history.push(`/author/${_id}`);
                }}>
                    {
                    author.map(artist => {
                        return artist.name
                    })
                    }
                </div>
            </div>
        </Link>
    );
}

CatalogueItem.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string
    }).isRequired).isRequired,
    image: PropTypes.string.isRequired
}

export default CatalogueItem;