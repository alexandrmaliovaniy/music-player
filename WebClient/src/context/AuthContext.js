import {createContext} from 'react';

export const AuthContext = createContext({
    token: null,
    id: null,
    username: null,
    isAuth: false,
    login: () => {},
    logout: () => {},
})