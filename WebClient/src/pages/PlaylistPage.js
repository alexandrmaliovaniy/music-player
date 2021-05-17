import Playlist from '../components/Playlist/Playlist';
import PlaylistBanner from '../components/Playlist/PlaylistBanner';
import './PlaylistPage.css';

const PlaylistPage = () => {
    return (
        <div className="PlaylistPage">
            <div className="bannerPlaceholder">
                <PlaylistBanner />
            </div>
            <div className="songsList">
                <Playlist />
            </div>
        </div>
    )
}

export default PlaylistPage;