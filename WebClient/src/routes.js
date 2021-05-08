import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginPage from './pages/LoginPage';

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Redirect to="/home"/>
        </Switch>
    )
}