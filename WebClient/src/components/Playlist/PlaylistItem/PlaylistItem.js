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
            {/* <img 
                className="itemImage"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.smehost.net%2Frcarecordscom-usrcaprod%2Fwp-content%2Fuploads%2F2018%2F01%2FTDG-OUTSIDER-album-artwork-561x561.jpg&f=1&nofb=1" /> */}
                <div className="itemInfo">
                    <div className="itemName">
                        {name}
                    </div>
                    <Link to="/" className="itemAuthor">{author.name}</Link>
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
    id: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    author: {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    },
    listenCount: PropTypes.number.isRequired,
    length: PropTypes.string.isRequired
}


export default PlaylistItem;