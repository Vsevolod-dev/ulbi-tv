import {useCallback, useEffect, useState} from "react";
import {getCookie} from "../utils/helpers";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(null);
    const [userId, setUserId] = useState(null);
    
    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        document.cookie = `token=${jwtToken};max-age=${60*60*24*30}; path=/;`
        document.cookie = `userId=${id};max-age=${60*60*24*30}; path=/;`
    }, []);
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        document.cookie = 'token=; Max-Age=0'
        document.cookie = 'userId=; Max-Age=0'
    }, []);

    useEffect(() => {
        const dataToken = getCookie('token')
        const dataUserId = getCookie('userId')

        if (dataToken && dataUserId) {
            login(dataToken, dataUserId)
        }
        setReady(true)
    }, [login]);

    return {login, logout, token, userId, ready}
}