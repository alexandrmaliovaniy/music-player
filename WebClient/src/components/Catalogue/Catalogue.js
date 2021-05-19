import CatalogueItem from './CatalogueItem/CatalogueItem';
import PropTypes from 'prop-types';
import './Catalogue.css';
const Catalogue = ({name, list}) => {
    console.log(list);
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
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        author: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string
        }).isRequired).isRequired,
    image: PropTypes.string.isRequired
    })).isRequired
}


export default Catalogue;