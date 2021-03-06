import React, {useState} from 'react';
import {Switch, Route, Redirect, Link, Router} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Sidebar from './components/Sidebar/Sidebar';
import MusicPlayer from './components/Player/MusicPlayer';
import Home from './pages/Home';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Header from './components/Header/Header';
import PlaylistPage from './pages/PlaylistPage';
import AuthorPage from './pages/AuthorPage';
import NewPlaylist from './pages/NewPlaylist';
import FavoritesPage from './pages/FavoritesPage';

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <div className="wrapper">
                <div className="userInterface">
                    <div className="sideBarContainer">
                        <Sidebar />
                    </div>
                    <div className="mainContainer">
                        <Header />
                        <div className="mainContent">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/home" component={Home} />
                                <Route path="/search" component={Search} />
                                <Route path="/playlist/:id" component={PlaylistPage} />
                                <Route path="/newplaylist" component={NewPlaylist} />
                                <Route path="/author/:id" component={AuthorPage} />
                                <Route path="/favorites" component={FavoritesPage} />
                                <Route path="/404" component={NotFound} />
                                <Redirect to="/404"/>
                            </Switch>
                            <div className="mainContentFooter"></div>
                        </div>
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
            <Redirect to="/login"/>
        </Switch>
    );
}