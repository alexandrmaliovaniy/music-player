import Playlist from '../components/Playlist/Playlist';
import Searchbar from '../components/Searchbar/Searchbar';
import './Search.css';
const Search = () => {
    return (
        <div className="Search">
            <Searchbar />
            <Playlist />
        </div>
    )
}

export default Search;