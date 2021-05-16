import React, {useContext, useEffect} from 'react';
import Playlist from '../components/Playlist/Playlist';
import { CurrentPageContext } from '../context/CurrentPageContext';
import './Search.css';
const Search = () => {

    
    const {setCurrentPage} = useContext(CurrentPageContext);
    useEffect(() => {
        setCurrentPage(1);
    }, [])

    return (
        <div className="Search">
            <Playlist />
            <Playlist />
        </div>
    )
}

export default Search;