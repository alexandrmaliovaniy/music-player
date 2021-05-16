import CatalogueItem from './CatalogueItem/CatalogueItem';
import PropTypes from 'prop-types';
import './Catalogue.css';
const Catalogue = ({name, list}) => {
    return (
        <div className="CatalogueContainer">
            <div className="catalogueTitle">
                {name}
            </div>
            <div className="catalogueList">
                {list.map(el => {
                    return <CatalogueItem {...el} key={el.id} />
                })}
            </div>
        </div>
    );
}

Catalogue.propTypes = {
    name: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        author: PropTypes.string,
        image: PropTypes.string
    })).isRequired
}


export default Catalogue;