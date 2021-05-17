import PropTypes from 'prop-types';
import './PlaylistBanner.css';
const PlaylistBanner = ({id, image, name, description}) => {
    return (
        <div className="PlaylistBanner">
            <div className="playlistBannerInfo">
                <img
                width="200"
                height="200"
                className="playlistBannerPreviev"
                src={image} />
                <div className="playlistBannerDescription">
                    <div className="playlistBannerName">
                        {name}
                    </div>
                    <div className="playlistBannerDetails">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}

PlaylistBanner.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default PlaylistBanner;