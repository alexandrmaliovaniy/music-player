import PlaylistItem from './PlaylistItem/PlaylistItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import './Playlist.css';
import { useState } from 'react';

const Playlist = () => {

    const [data, setData] = useState([
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
        }
    ]);



    return (
        <div className="Playlist">
            <div className="playlistTableHead">
                <div className="alignCenter">#</div>
                <div>Name</div>
                <div className="alignRight">Listen Count</div>
                <div className="alignRight"><FontAwesomeIcon icon={faClock} /></div>
            </div>
            {data.map((el, index) => {
                return <PlaylistItem {...el} key={index} order={index} />
            })}
        </div>
    )
}

export default Playlist;