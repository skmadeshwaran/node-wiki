import { useState } from "react";

export default function useToken() {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return tokenString;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', userToken);
        setToken(userToken);
    }

    const deleteToken = () => {
        sessionStorage.removeItem('token');
        setToken(null);
    }

    return {
        setTokens: saveToken,
        token,
        deleteToken: deleteToken
    }
}