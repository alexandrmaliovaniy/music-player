import Playlist from '../components/Playlist/Playlist';
import './PlaylistPage.css';

const PlaylistPage = () => {
    return (
        <div className="PlaylistPage">
            <div className="playlistHeader">
                
            </div>
            <div className="songsList">
                <Playlist />
            </div>
        </div>
    )
}

export default PlaylistPage;