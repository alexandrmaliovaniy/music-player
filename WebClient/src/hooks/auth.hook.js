import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from './http.hook';

const storageName = "music-player";

export function useAuth() {
    const {request} = useHttp();
    const [ready, setReady] = useState(false);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [id, setUserId] = useState(null);
    const [username, setUsername] = useState(null);

    const login = useCallback(async(jwtToken, refreshToken, id, username) => { 
        try {
            setToken(jwtToken);
            setRefreshToken(refreshToken);
            setUserId(id);
            setUsername(username);
            localStorage.setItem(storageName, JSON.stringify({refreshToken, id, username, token: jwtToken}))
        } catch(e) {
            console.log(e);
        }
        setReady(true);
    }, [])
    const logout = useCallback(() => {
        request('/api/auth/logout', "POST", {
            id,
            refreshToken
        })
        setToken(null);
        setRefreshToken(null);
        setUserId(null);
        setUsername(null);
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.refreshToken, data.id, data.username);
        } else {
            setReady(true);
        }
    }, [login])

    return {login, logout, token, setToken, refreshToken, id, username, ready};
}