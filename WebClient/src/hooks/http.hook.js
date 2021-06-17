import {useState, useCallback, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {token, refreshToken, setToken, login, logout, id, username} = useContext(AuthContext);
    const request = useCallback(async (url, method = "GET", body = 'null', headers = {}) => {
        setLoading(true);

        if (body && typeof body == "object") {
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
                const {token} = await request('/api/auth/refresh', "POST", {
                    id,
                    refreshToken
                });
                if (!token) return logout();
                login(token, refreshToken, id, username);
                headers["Authorization"] = `Bearer ${token}`;
                const out = await request(url, method, body, headers);
                return out;
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