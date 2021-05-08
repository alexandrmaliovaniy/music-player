import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

export const useRoutes = () => {
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
    )
}