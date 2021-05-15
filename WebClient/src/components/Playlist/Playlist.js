import PlaylistItem from './PalylistItem/PlaylistItem';
import './Playlist.css';
const Playlist = () => {
    return (
        <div className="playlistContainer">
            <div className="playlistSectionTitle">
                Playlist title
            </div>
            <div className="playlistSection">
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
                <PlaylistItem />
            </div>
        </div>
    );
}

export default Playlist;