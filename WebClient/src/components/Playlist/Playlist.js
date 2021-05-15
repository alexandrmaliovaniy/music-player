import PlaylistItem from './PalylistItem/PlaylistItem';
import './Playlist.css';
const Playlist = () => {
    return (
        <div className="playlistContainer">
            <div className="playlistSectionTitle">
                Playlist title
            </div>
            <PlaylistItem />
        </div>
    );
}

export default Playlist;