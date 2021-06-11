import { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom'
import Catalogue from '../components/Catalogue/Catalogue';
import CatalogueBanner from '../components/Catalogue/CatalogueBanner';
import CataloguePlay from '../components/Catalogue/CataloguePlay';
import Playlist from '../components/Playlist/Playlist';
import { CurrentPageContext } from '../context/CurrentPageContext';
import {useHttp} from '../hooks/http.hook';
import './AuthorPage.css';

const AuthorPage = () => {

    const artistId = useParams().id;

    const {request, GetAuth} = useHttp();
    const [artist, setArtist] = useState({
        _id: "",
        image: "",
        username: "",
        description: ""
    });

    const [popular, setPopular] = useState([]);

    const requestArtistInfo = useCallback(async() => {
        try {
            const artistData = await request(`/api/artist/info/${artistId}`, "GET", null);
            setArtist({...artist, ...artistData, name: artistData.username});
        } catch (e) {
            console.log(e);
        }
    }, [artistId, request, artist])

    const requestArtistSongs = useCallback(async() => {
        try {
            const songs = await request(`/api/artist/popular/${artistId}`, "GET", null, GetAuth());
            setPopular(songs);
        } catch (e) {
            console.log(e);
        }
    }, [request, artistId])

    const {setCurrentPage} = useContext(CurrentPageContext);

    useEffect(() => {
        setCurrentPage(null);
        requestArtistInfo();
        requestArtistSongs();
    }, [])

    const [catalogue] = useState({
        name: "Three Days Grace albums",
        list: [
            {
                id: "1",
                name: "Three Days Grace",
                author: [{
                    id: "1",
                    name: "Three Days Grace"
                }],
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.vinylcollective.com%2Fwp-content%2Fuploads%2F2016%2F09%2Fthreedays.jpg&f=1&nofb=1"
            },
            {
                id: "2",
                name: "Outsider",
                author: [{
                    id: "1",
                    name: "Three Days Grace"
                }],
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.smehost.net%2Frcarecordscom-usrcaprod%2Fwp-content%2Fuploads%2F2018%2F01%2FTDG-OUTSIDER-album-artwork-561x561.jpg&f=1&nofb=1"
            }
        ]
    })


    return (
        <div className="AuthorPage">
            <div className="authorBanner">
                <CatalogueBanner {...artist}/>
            </div>
            <CataloguePlay artistId={artist._id} />
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