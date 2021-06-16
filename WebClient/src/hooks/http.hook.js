import {useState, useCallback, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {token, refreshToken, setToken, login, logout, id} = useContext(AuthContext);
    const request = useCallback(async (url, method = "GET", body = 'null', headers = {}) => {
        setLoading(true);

        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }

        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            });
            const data = await response.json();
            if (data?.message === "Authorization error") {
                try {
                    const {token} = await request('/api/auth/refresh', "POST", {
                        id,
                        refreshToken
                    });
                    setToken(token);
                    const out = await request(url, method, body, {Authorization: `Bearer ${token}`});
                    return out;
                } catch(e) {
                    console.log(e);
                    if (e.message == "Unvalid refresh token") {
                        logout();
                    }
                }
            }
            if (!response.ok) {
                throw data;
            }
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const GetAuth = () => {
        return {Authorization: `Bearer ${token}`}
    }

    const clearError = () => setError(false);

    return {loading, request, error, clearError, GetAuth};
}