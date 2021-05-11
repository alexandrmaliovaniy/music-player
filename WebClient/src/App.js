import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import Preloader from './pages/Preloader';


function App() {
	const {token, id, username, login, logout, ready} = useAuth();
	const isAuth = !!token;
	const routes = useRoutes(isAuth);

	if (!ready) return (<Preloader />);
	return (
		<AuthContext.Provider value={{
			token,id,username,login,logout,isAuth
		}}>
			<Router>
				<div className="App">
					{routes}
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
