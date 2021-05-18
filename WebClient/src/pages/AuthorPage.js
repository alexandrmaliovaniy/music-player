import { useState } from 'react';
import Catalogue from '../components/Catalogue/Catalogue';
import CatalogueBanner from '../components/Catalogue/CatalogueBanner';
import Playlist from '../components/Playlist/Playlist';
import './AuthorPage.css';

const AuthorPage = () => {

    const [artist] = useState({
        id: '0',
        image: "",
        name: "Artist name",
        description: "some description"
    })


    const [popular] = useState([
        {
            id: "0",
            name: "Burn",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 110000,
            length: "4:27"
        },
        {
            id: "1",
            name: "Just Like You",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 3310000,
            length: "3:06"
        },
        {
            id: "2",
            name: "I hate everythink about you",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 110000,
            length: "0:27"
        },
        {
            id: "3",
            name: "Some name",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 120,
            length: "44:27"
        },
        {
            id: "3",
            name: "Some name",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 120,
            length: "44:27"
        },
        {
            id: "3",
            name: "Some name",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 120,
            length: "44:27"
        },{
            id: "3",
            name: "Some name",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 120,
            length: "44:27"
        },
        {
            id: "3",
            name: "Some name",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 120,
            length: "44:27"
        },
        {
            id: "3",
            name: "Some name",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 120,
            length: "44:27"
        },
        {
            id: "3",
            name: "Some name",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 120,
            length: "44:27"
        },
        {
            id: "3",
            name: "Some name",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 120,
            length: "44:27"
        },
        {
            id: "3",
            name: "Some name",
            author: {
                id: "0",
                name: "Three days grace"
            },
            listenCount: 120,
            length: "44:27"
        }
    ]);


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
        <div className="AuthorPage">
            <div className="authorBanner">
                <CatalogueBanner {...artist} />
            </div>
            <div className="authorPopular">
                <div className="authorPopularTitle">
                    Popular Songs
                </div>
                <Playlist list={popular} />
            </div>
            <div className="authorWorks">
                <Catalogue {...catalogue} />
            </div>
        </div>
    )
}

export default AuthorPage;