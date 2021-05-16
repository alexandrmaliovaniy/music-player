import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import './CatalogueItem.css';
const CatalogueItem = ({id, name, author, image}) => {
    return (
        <div className="CatalogueItem">
            <div className="catalogueItemDisplay">
                <img
                className="catalogueItemImg"
                width="200"
                height="200"
                src={image}
                alt={`Playlist name: ${name}, Author: ${author}`}
                />
                <div className="catalogueItemButton">
                    <FontAwesomeIcon icon={faPlay} />
                </div>
            </div>
            <div className="catalogueItemDescription">
                <div className="catalogueItemName">
                    {name}
                </div>
                <div className="catalogueItemAuthor">
                    Author: {author}
                </div>
            </div>
        </div>
    );
}

CatalogueItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}

export default CatalogueItem;