import PropTypes from 'prop-types';
import '../Catalogue/CatalogueBanner.css';
const CatalogueBanner = ({_id, image, name, description}) => {
    return (
        <div className="CatalogueBanner">
            <div className="CatalogueBannerInfo">
                <img
                width="200"
                height="200"
                className="CatalogueBannerPreviev"
                src={image} 
                alt=""/>
                <div className="CatalogueBannerDescription">
                    <div className="CatalogueBannerName">
                        {name}
                    </div>
                    <div className="CatalogueBannerDetails">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}

CatalogueBanner.propTypes = {
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default CatalogueBanner;