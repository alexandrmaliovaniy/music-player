import React, {useContext, useEffect, useState} from 'react';
import Catalogue from '../components/Catalogue/Catalogue';
import { CurrentPageContext } from '../context/CurrentPageContext';
import './Home.css';

const Home = () => {
    const {setCurrentPage} = useContext(CurrentPageContext);
    useEffect(() => {
        setCurrentPage(0);
    }, [])


    const [catalogue] = useState({
        name: "Three Days Grace albums",
        list: [
            {
                id: "1",
                name: "Three Days Grace",
                author: {
                    id: "1",
                    name: "Three Days Grace"
                },
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.vinylcollective.com%2Fwp-content%2Fuploads%2F2016%2F09%2Fthreedays.jpg&f=1&nofb=1"
            },
            {
                id: "2",
                name: "Outsider",
                author: {
                    id: "1",
                    name: "Three Days Grace"
                },
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.smehost.net%2Frcarecordscom-usrcaprod%2Fwp-content%2Fuploads%2F2018%2F01%2FTDG-OUTSIDER-album-artwork-561x561.jpg&f=1&nofb=1"
            }
        ]
    })


    return (
        <div className="Home">
            <Catalogue {...catalogue} />
        </div>
    )
}

export default Home;