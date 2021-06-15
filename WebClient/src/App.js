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
import { UserPlaylistsContext } from './context/UserPlaylistsContext';


function App() {
	const auth = useAuth();
	const isAuth = !!auth.token;
	const routes = useRoutes(isAuth);

	const [currentPage, setCurrentPage] = useState(null);
	const [userPlaylists, setUserPlaylists] = useState([]);
	const player = usePlayer();
	if (!auth.ready) return (<Preloader />);
	return (
		<AuthContext.Provider value={auth}>
			<UserPlaylistsContext.Provider value={{userPlaylists,setUserPlaylists}}>
				<PlayerContext.Provider value={player}>
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
			</UserPlaylistsContext.Provider>
		</AuthContext.Provider>
	);
}
export default App;
