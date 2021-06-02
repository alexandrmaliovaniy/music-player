import { useState, useContext, useEffect, useCallback } from 'react';
import Playlist from '../components/Playlist/Playlist';
import {useParams} from 'react-router-dom';
import CatalogueBanner from '../components/Catalogue/CatalogueBanner';
import {CurrentPageContext} from '../context/CurrentPageContext';
import {useHttp} from '../hooks/http.hook';
import './PlaylistPage.css';
import CataloguePlay from '../components/Catalogue/CataloguePlay';

const PlaylistPage = () => {

    const {request} = useHttp();
    const [playlist, setPlaylist] = useState({
        name: "",
        image: "",
        _id: "",
        songs: []
    });
    const playlistId = useParams().id;
    const {setCurrentPage} = useContext(CurrentPageContext);

    const requestPlaylist = useCallback(async() => {
        try {
            const playlistData = await request(`/api/playlist/${playlistId}`, "GET", null);
            setPlaylist(playlistData[0]);
        } catch (e) {
            console.log(e);
        }
    })

    useEffect(() => {
        setCurrentPage(null);
        requestPlaylist();
    }, [])


    return (
        <div className="PlaylistPage">
            <div className="bannerPlaceholder">
                <CatalogueBanner _id={playlist._id} name={playlist.name} image={playlist.image} />
            </div>
            <CataloguePlay playlistId={playlist._id} />
            <div className="songsList">
                <Playlist list={playlist.songs} _id={playlist._id} />
            </div>
        </div>
    )
}

export default PlaylistPage;