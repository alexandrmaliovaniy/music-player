import React, {useContext, useEffect, useState, useCallback} from 'react';
import {useHttp} from '../hooks/http.hook';
import Catalogue from '../components/Catalogue/Catalogue';
import { CurrentPageContext } from '../context/CurrentPageContext';
import './Home.css';

const Home = () => {

    const {request} = useHttp();
    const [popular, setPopular] = useState([])

    const reqestPopular = useCallback(async() => {
        try {
            const popular = await request('/api/playlist/popular', "GET", null);
            console.log(popular)
            setPopular(popular);
        } catch (e) {
            console.log(e);
        }
    })

    const {setCurrentPage} = useContext(CurrentPageContext);
    useEffect(() => {
        setCurrentPage(0);
        reqestPopular();
    }, [])


    return (
        <div className="Home">
            <Catalogue name="Popular" list={popular} />
        </div>
    )
}

export default Home;