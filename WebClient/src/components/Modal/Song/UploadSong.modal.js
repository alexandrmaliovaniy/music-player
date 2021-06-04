import { faMusic, faCompactDisc, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UploadSong.modal.css';
const UploadSong = () => {
    return (
        <div className="UploadSongModal">
            <div className="formPlaceholder">
                <label for="songPlaceholder" className="songUpload">
                    <FontAwesomeIcon icon={faCompactDisc} className="songUploadIcon" />
                    <input type="file" id="songPlaceholder" />
                </label>
                <input type="text" placeholder="Song name" name="name" className="songName" />
                <button className="saveSong">
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    )
}
export default UploadSong;