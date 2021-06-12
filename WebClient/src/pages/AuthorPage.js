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
    const [catalogue, setCatalogue] = useState([]);

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
    const requestArtistWorks = useCallback(async() => {
        try {
            const playlists = await request(`/api/artist/playlists/${artistId}`, "GET", null);
            setCatalogue(playlists);
        } catch (e) {
            console.log(e);
        }
    }, [request, artistId])


    const {setCurrentPage} = useContext(CurrentPageContext);

    useEffect(() => {
        setCurrentPage(null);
        requestArtistInfo();
        requestArtistSongs();
        requestArtistWorks();
    }, [])
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
                <Catalogue list={catalogue} name={artist?.username + " playlists" || "User's playlists"} />
            </div>
        </div>
    )
}

export default AuthorPage;