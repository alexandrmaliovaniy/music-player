import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './CataloguePlay.css';

const CataloguePlay = () => {
    return (
        <div className="CataloguePlay">
            <div className="cataloguePlayBtn">
                <FontAwesomeIcon icon={faPlay}  />
            </div>
            <button className="followBtn">
                follow
            </button>
        </div>
    )
}

export default CataloguePlay;