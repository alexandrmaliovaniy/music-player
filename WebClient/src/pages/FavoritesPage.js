import Playlist from '../components/Playlist/Playlist';
import { useHttp } from "../hooks/http.hook";
import {useEffect, useState} from 'react';

const FavoritePage = () => {

    const {request, GetAuth} = useHttp();
    const [list, setList] = useState([]);
    const loadFavorites = async() => {
        try {
            const data = await request('/api/artist/favorites', 'GET', null, GetAuth());
            setList(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <div className="FavoritePage">
            <Playlist list={list} />
        </div>
    );
}

export default FavoritePage;