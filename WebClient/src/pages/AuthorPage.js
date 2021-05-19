import { useContext, useEffect, useState } from 'react';
import Catalogue from '../components/Catalogue/Catalogue';
import CatalogueBanner from '../components/Catalogue/CatalogueBanner';
import CataloguePlay from '../components/Catalogue/CataloguePlay';
import Playlist from '../components/Playlist/Playlist';
import { CurrentPageContext } from '../context/CurrentPageContext';
import './AuthorPage.css';

const AuthorPage = () => {

    const {setCurrentPage} = useContext(CurrentPageContext);

    useEffect(() => {
        setCurrentPage(null);
    }, [])

    const [artist] = useState({
        id: '0',
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F79%2Fec%2F14%2F79ec145d48cbc5a5de09c69bd5fbc118.jpg&f=1&nofb=1",
        name: "Artist name",
        description: "some description"
    })


    const [popular] = useState([
        {
            id: "0",
            name: "Burn",
            image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcovers3.img-themusic-world.info%2F000%2F13%2F13748.jpg&f=1&nofb=1",
            listenCount: 110000,
            length: "4:27"
        },
        {
            id: "1",
            name: "Just Like You",
            image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.laut.de%2FThree-Days-Grace%2FAlben%2FHuman-95994%2Fthree-days-grace-human-160698.jpg&f=1&nofb=1",
            listenCount: 3310000,
            length: "3:06"
        },
        {
            id: "2",
            name: "I hate everythink about you",
            image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.laut.de%2FThree-Days-Grace%2FAlben%2FHuman-95994%2Fthree-days-grace-human-160698.jpg&f=1&nofb=1",
            listenCount: 110000,
            length: "0:27"
        },
        {
            id: "3",
            name: "Some name",
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F8%2F8a%2FOutsider.jpg&f=1&nofb=1",
            listenCount: 120,
            length: "44:27"
        },
        {
            id: "3",
            name: "Some name",
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F8%2F8a%2FOutsider.jpg&f=1&nofb=1",
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
            <CataloguePlay artistId={artist.id} />
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