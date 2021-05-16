import React, {useContext, useEffect} from 'react';
import Catalogue from '../components/Catalogue/Catalogue';
import { CurrentPageContext } from '../context/CurrentPageContext';
import './Search.css';
const Search = () => {

    
    const {setCurrentPage} = useContext(CurrentPageContext);
    useEffect(() => {
        setCurrentPage(1);
    }, [])

    return (
        <div className="Search">
            
        </div>
    )
}

export default Search;