import { faCross, faDownload, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useContext, useCallback, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import {useFormError} from '../hooks/formError.hook';
import {CurrentPageContext} from '../context/CurrentPageContext';
import {AuthContext} from '../context/AuthContext';
import {UserPlaylistsContext} from '../context/UserPlaylistsContext';
import Playlist from '../components/Playlist/Playlist';
import UploadSong from '../components/Modal/Song/UploadSong.modal';
import './NewPlaylist.css';
const NewPlaylist = () => {

    const {setCurrentPage} = useContext(CurrentPageContext);
    const history = useHistory();
    const {request, GetAuth} = useHttp();
    const auth = useContext(AuthContext);
    const [modal, setModal] = useState(false);
    const {userPlaylists, setUserPlaylists} = useContext(UserPlaylistsContext)
    const [id, setId] = useState(null);
    const [formInput, setFormInput] = useState({
        image: null,
        name: "",
        songs: []
    });


    useEffect(() => {
        setCurrentPage(2);
    }, [setCurrentPage])

    useEffect(() => {
        CreatePlaylist();
    }, [request]);

    useEffect(() => {
        if (!id) return;
        setUserPlaylists([
            ...userPlaylists,
            {
                _id: id,
                author: auth.id,
                name: "New Playlist"
            }
        ])
    }, [id]);

    // const {Validate, fieldStatus, setFieldStatus, IsComplete, GetError, GetAuth} = useFormError({
    //     image: {},
    //     name: {},
    //     songs: {}
    // });

    const FileUpload = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setFormInput({
                ...formInput,
                [e.target.name]: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    const SaveSong = (song) => {
        const SongData = {
            id: "",
            name: song.name,
            data: song.song,
            length: new Date(song.time * 1000 || 0).toISOString().substr(14, 5),
            listenCount: 0
        }
        const newSongs = [...formInput.songs];
        newSongs.push(SongData);
        setFormInput({
            ...formInput,
            songs: newSongs
        })
        request('/api/playlist/song', 'POST', {
            playlistId: id,
            song: song
        }, GetAuth())
    }

    const Input = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    }


    const UploadPlaylist = async() => {
        try {
            await request('/api/playlist/data', 'POST', {
                playlistId: id,
                name: formInput.name,
                image: formInput.image
            }, GetAuth());
            setUserPlaylists(userPlaylists.map(el => {
                if (el._id !== id) return el;
                el.name = formInput.name;
                return el;
            }))
            history.push(`/playlist/${id}`);
        } catch(e) {
            console.log(e)
        }
    }

    const CreatePlaylist = useCallback(async() => {
        try {
            
            const playlist = await request('/api/playlist/', 'POST', null, GetAuth());
            setId(playlist.id);
        } catch(e) {
            console.log(e);
        }
    }, [request])
    

    return (
        <div className="NewPlaylist">
            <div className="GeneralData">
                <label htmlFor="ImagePlaceholder" className="playlistImg">
                    <img alt="" className="imageView" src={formInput.image} />
                    <div className="uploadDisplay">
                        <FontAwesomeIcon icon={faDownload} className="uploadImage" />
                        <p>Upload Image</p>
                    </div>
                    <input type="file" name="image" accept="image" id="ImagePlaceholder"  onChange={FileUpload} />
                </label>
                <input type="text" className="playlistName" name="name" placeholder="Playlist name" onChange={Input} />
            </div>
            <Playlist list={formInput.songs} />
            <div className="newSong" onClick={()=>setModal(true)}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="createPlaylist" onClick={UploadPlaylist}>Create</div>
            {modal ? <UploadSong saveSong={SaveSong} setModal={setModal} /> : ""}
        </div>
    )
}

export default NewPlaylist;