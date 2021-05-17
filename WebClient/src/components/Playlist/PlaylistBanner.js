import './PlaylistBanner.css';
const PlaylistBanner = () => {
    return (
        <div className="PlaylistBanner">
            <div className="playlistBannerInfo">
                <img width="200" height="200" className="playlistBannerPreviev"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.smehost.net%2Frcarecordscom-usrcaprod%2Fwp-content%2Fuploads%2F2018%2F01%2FTDG-OUTSIDER-album-artwork-561x561.jpg&f=1&nofb=1" />
                <div className="playlistBannerDescription">
                    <div className="playlistBannerName">
                        playlist name
                    </div>
                    <div className="playlistBannerDetails">
                        Some description here...
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistBanner;