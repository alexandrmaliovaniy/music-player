import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { CurrentPageContext } from './context/CurrentPageContext';
import Preloader from './pages/Preloader';
import { useState } from 'react';
import { PlayerContext } from './context/PlayerContext';
import { usePlayer } from './hooks/player.hook';

function App() {
	const {token, id, username, login, logout, ready} = useAuth();
	const isAuth = !!token;
	const routes = useRoutes(isAuth);

	const [currentPage, setCurrentPage] = useState(null);

	const {isPlaying, setPlaying, currentSong, setCurrentSong, queue, setQueue,
        TogglePlayer, Play, Stop, LoadSong} = usePlayer();

	if (!ready) return (<Preloader />);
	return (
		<AuthContext.Provider value={{
			token,id,username,login,logout,isAuth
		}}>
			<PlayerContext.Provider value={{
				isPlaying, setPlaying, currentSong, setCurrentSong, queue, setQueue,
				TogglePlayer, Play, Stop, LoadSong
			}} >
				<Router>
					<div className="App">
						<CurrentPageContext.Provider value={{
							currentPage,
							setCurrentPage
						}}>
						{routes}
						</CurrentPageContext.Provider>
					</div>
				</Router>
			</PlayerContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
