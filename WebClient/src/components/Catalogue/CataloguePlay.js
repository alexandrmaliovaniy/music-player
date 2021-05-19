import { faArrowDown, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './CataloguePlay.css';

const CataloguePlay = ({artistId, playlistId}) => {

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
            <div className="cataloguePlayBtn">
                <FontAwesomeIcon icon={faPlay}  />
            </div>
            {button}
        </div>
    )
}

export default CataloguePlay;