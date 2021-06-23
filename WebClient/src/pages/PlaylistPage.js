import { useState, useContext, useEffect, useCallback } from 'react';
import Playlist from '../components/Playlist/Playlist';
import {useParams} from 'react-router-dom';
import CatalogueBanner from '../components/Catalogue/CatalogueBanner';
import {CurrentPageContext} from '../context/CurrentPageContext';
import {useHttp} from '../hooks/http.hook';
import {Link} from 'react-router-dom';
import './PlaylistPage.css';
import CataloguePlay from '../components/Catalogue/CataloguePlay';

const PlaylistPage = () => {

    const {request, GetAuth} = useHttp();
    const [playlist, setPlaylist] = useState({
        name: "",
        image: "",
        _id: "",
        songs: [],
        author: {
            username: "",
            _id: ""
        }
    });
    const playlistId = useParams().id;
    const {setCurrentPage} = useContext(CurrentPageContext);
    const requestPlaylist = useCallback(async() => {
        if (!playlistId) return;
        try {
            const playlistData = await request(`/api/playlist/${playlistId}`, "GET", null, GetAuth());
            setPlaylist(playlistData);
        } catch (e) {
            console.log(e);
        }
    }, [playlistId]);

    useEffect(() => {
        setCurrentPage(playlistId);
        requestPlaylist();
    }, [requestPlaylist])

    return (
        <div className="PlaylistPage">
            <div className="bannerPlaceholder">
                <CatalogueBanner 
                _id={playlist._id} 
                name={playlist.name} 
                image={playlist.image} 
                description={<Link to={`/author/${playlist.author._id}`}>{playlist.author.username}</Link>}
                />
            </div>
            <CataloguePlay playlistId={playlist._id} authorId={playlist.author._id} playlistName={playlist.name} />
            <div className="songsList">
                <Playlist list={playlist.songs} _id={playlist._id} />
            </div>
        </div>
    )
}

export default PlaylistPage;