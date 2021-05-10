import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from './http.hook';

const storageName = "music-player";

export function useAuth() {
    const {request} = useHttp();
    const [ready, setReady] = useState(false);
    const [token, setToken] = useState(null);
    const [id, setUserId] = useState(null);
    const [username, setUsername] = useState(null);

    const login = useCallback(async(jwtToken, id, username) => { 
        try {
            // await request('/api/auth/validate', 'POST', null, {
            //     Authorization: `Bearer ${jwtToken}`
            // })
            setToken(jwtToken);
            setUserId(id);
            setUsername(username);
            localStorage.setItem(storageName, JSON.stringify({token: jwtToken, id: id, username: username}))
        } catch(e) {
            console.log(e);
            // if (e.message === "Authorization error") {
            //     logout();
            // }
        }
        setReady(true);
    }, [])
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUsername(null);
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.id, data.username);
        } else {
            setReady(true);
        }
    }, [login])

    return {login, logout, token, id, username, ready};
}