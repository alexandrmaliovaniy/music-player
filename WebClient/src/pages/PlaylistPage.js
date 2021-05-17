import { useState } from 'react';
import Playlist from '../components/Playlist/Playlist';
import PlaylistBanner from '../components/Playlist/PlaylistBanner';
import './PlaylistPage.css';

const PlaylistPage = () => {
    const [data, setData] = useState({
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.smehost.net%2Frcarecordscom-usrcaprod%2Fwp-content%2Fuploads%2F2018%2F01%2FTDG-OUTSIDER-album-artwork-561x561.jpg&f=1&nofb=1",
        name: "This is name of playlist",
        description: "This is description of playlist",
        list: [
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
    ]
    });

    return (
        <div className="PlaylistPage">
            <div className="bannerPlaceholder">
                <PlaylistBanner name={data.name} image={data.image} description={data.description}  />
            </div>
            <div className="songsList">
                <Playlist list={data.list} />
            </div>
        </div>
    )
}

export default PlaylistPage;