import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import './PlaylistItem.css';

const PlaylistItem = ({id, order, name, author, listenCount, length}) => {
    return (
        <div className="PlaylistItem">
            <div className="itemOrder">
                <div className="itemOrderIndex">{order + 1}</div>
                <FontAwesomeIcon icon={faPlay} className="playItem" />
            </div>
            <div className="itemDescription">
                <div className="itemName">
                    {name}
                </div>
                <Link to="/" className="itemAuthor">{author.name}</Link>
            </div>
            <div className="listenCount">
                {listenCount}
            </div>
            <div className="itemLength">
                {length}
            </div>
        </div>
    )
}

PlaylistItem.protoTypes = {
    id: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    name: PropTypes.string,
    author: {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }.isRequired,
    listenCount: PropTypes.number.isRequired,
    length: PropTypes.string.isRequired
}


export default PlaylistItem;