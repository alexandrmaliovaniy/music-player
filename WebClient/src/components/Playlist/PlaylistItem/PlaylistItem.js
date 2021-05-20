import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import './PlaylistItem.css';
import { PlayerContext } from '../../../context/PlayerContext';

const PlaylistItem = ({_id, order, name, author, listenCount, length, image}) => {

    const { PlaySong } = useContext(PlayerContext);

    return (
        <div className="PlaylistItem">
            <div className="itemOrder">
                <div className="itemOrderIndex">{order + 1}</div>
                <FontAwesomeIcon icon={faPlay} className="playItem" onClick={()=> PlaySong(_id)} />
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