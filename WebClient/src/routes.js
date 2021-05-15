import React from 'react';
import {Switch, Route, Redirect, Link, Router} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Sidebar from './components/Sidebar/Sidebar';
import MusicPlayer from './components/Player/MusicPlayer';
import Home from './pages/Home';

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <div className="wrapper">
                <div className="userInterface">
                    <div className="sideBarContainer">
                        <Sidebar />
                    </div>
                    <div className="mainContainer">
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/search" component={Home} />
                        </Switch>
                    </div>
                </div>
                <div className="musicPlayerContainer">
                    <MusicPlayer />
                </div>
            </div>
        );
    }
    return (
        <Switch>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Route path="/registration" exact>
                <RegistrationPage />
            </Route>
            <Redirect to="/home"/>
        </Switch>
    );
}