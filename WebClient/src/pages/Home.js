import React, {useContext} from 'react';
import Playlist from '../components/Playlist/Playlist';
import { CurrentPageContext } from '../context/CurrentPageContext';
import './Home.css';

const Home = () => {
    const {setCurrentPage} = useContext(CurrentPageContext);
    setCurrentPage(0);

    return (
        <div className="Home">
            <Playlist />
        </div>
    )
}

export default Home;