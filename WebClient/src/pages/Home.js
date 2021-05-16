import React, {useContext, useEffect} from 'react';
import Playlist from '../components/Playlist/Playlist';
import { CurrentPageContext } from '../context/CurrentPageContext';
import './Home.css';

const Home = () => {
    const {setCurrentPage} = useContext(CurrentPageContext);
    useEffect(() => {
        setCurrentPage(0);
    }, [])
    
    return (
        <div className="Home">
            <Playlist />
        </div>
    )
}

export default Home;