import { faMusic, faDownload, faCompactDisc, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './UploadSong.modal.css';
const UploadSong = ({setModal, saveSong}) => {
    const [formInput, setFormInput] = useState({
        song: "",
        name: "",
        time: 0
    });


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

    const SaveSong = () => {
        const a = new Audio(formInput.song);
        const durationCheck = setInterval(() => {
            if (!Number.isFinite(a.duration) || Number.isNaN(a.duration)) return;
            clearInterval(durationCheck);
            const newVal = {
                ...formInput,
                time: a.duration
            }
            setFormInput(newVal);
            saveSong(newVal);
            setModal(false);
        }, 100)
    }
    const Input = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    }

    // const {Validate, fieldStatus, setFieldStatus, IsComplete, GetError} = useFormError({
    //     image: {},
    //     name: {},
    //     songs: {}
    // });

    return (
        <div className="UploadSongModal" onClick={()=>setModal(false)}>
            <div className="formPlaceholder" onClick={(e)=>e.stopPropagation()}>
                <label htmlFor="songPlaceholder" className="songUpload">
                    <FontAwesomeIcon icon={formInput.song == "" ? faDownload : faCompactDisc} className="songUploadIcon" />
                    <input type="file" name="song" id="songPlaceholder" onChange={FileUpload} />
                </label>
                <input type="text" placeholder="Song name" name="name" className="songName" onChange={Input} />
                <button className="saveSong" onClick={SaveSong}> 
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    )
}
export default UploadSong;