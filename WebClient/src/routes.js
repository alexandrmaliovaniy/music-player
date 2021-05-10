import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';


export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/home">
                    <div>Home</div>
                </Route>
                <Redirect to="/home" />
            </Switch>
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