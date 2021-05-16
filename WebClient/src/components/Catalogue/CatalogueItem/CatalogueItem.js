import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import './CatalogueItem.css';
const CatalogueItem = ({id, name, author, image}) => {
    return (
        <Link to="/search" className="CatalogueItem">
            <div className="catalogueItemDisplay">
                <img
                className="catalogueItemImg"
                width="200"
                height="200"
                src={image}
                alt={`Playlist name: ${name}, Author: ${author}`}
                />
                <div className="catalogueItemButton" onClick={(e)=>e.preventDefault()}>
                    <FontAwesomeIcon icon={faPlay} />
                </div>
            </div>
            <div className="catalogueItemDescription">
                <div className="catalogueItemName">
                    {name}
                </div>
                <Link to="/" className="catalogueItemAuthor">
                    {author.name}
                </Link>
            </div>
        </Link>
    );
}

CatalogueItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    }).isRequired,
    image: PropTypes.string.isRequired
}

export default CatalogueItem;