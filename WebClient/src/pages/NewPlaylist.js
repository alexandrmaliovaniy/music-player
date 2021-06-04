import { faCross, faDownload, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useContext, useEffect, useState} from 'react';
import {useFormError} from '../hooks/formError.hook';
import {CurrentPageContext} from '../context/CurrentPageContext';
import Playlist from '../components/Playlist/Playlist';
import './NewPlaylist.css';
const NewPlaylist = () => {
    const {setCurrentPage} = useContext(CurrentPageContext);

    const [formInput, setFormInput] = useState({
        image: null,
        name: "",
        songs: []
    });


    const {Validate, fieldStatus, setFieldStatus, IsComplete, GetError} = useFormError({
        image: {},
        name: {},
        songs: {}
    });

    const FileUpload = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            console.log(reader.result, e.target)
            setFormInput({
                ...formInput,
                [e.target.name]: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        setCurrentPage(2);
    }, [])

    return (
        <div className="NewPlaylist">
            <div className="GeneralData">
                <label for="ImagePlaceholder" className="playlistImg">
                    <img alt="" className="imageView" src={formInput.image} />
                    <div className="uploadDisplay">
                        <FontAwesomeIcon icon={faDownload} className="uploadImage" />
                        <p>Upload Image</p>
                    </div>
                    <input type="file" name="image" accept="image" id="ImagePlaceholder"  onChange={FileUpload} />
                </label>
                <input type="text" className="playlistName" placeholder="Playlist name" />
            </div>
            <Playlist list={formInput.songs} />
            <div className="newSong">
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
    )
}

export default NewPlaylist;