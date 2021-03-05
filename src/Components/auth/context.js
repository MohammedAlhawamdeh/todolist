import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';


export const LoginContext = React.createContext()
const API = 'https://deployed-api-server.herokuapp.com'

const LoginProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({})
    const [token, setToken] = useState()

    const can = (acl) => {
        return state.user?.acl?.includes(acl);

    }
    const login = (username, password) => {
        const auth = { username, password };
        axios.post(`${API}/signin`, {}, { auth })
            .then(response => {
                validateToken(response?.data);
            })
            .catch(console.error);
    }

    const signup = (state) => {

        axios({
            method: 'post',
            url: `${API}/signup`,
            data: state,

        })
            .then(response => {
                console.log(response)
                validateToken(response?.data);

            })
            .catch(console.error);
    }

    const validateToken = useCallback(token => {
        try {
            const user = jwt.verify(token, "NoBodyKnow");
            console.log('user :', user);
            setLoginState(true, token, user);
        }
        catch (e) {
            console.log('invalid token');
            setLoginState(false, null, {});
            console.log('Token Validation Error', e);
        }

    }, []);

    const logout = () => {
        setLoginState(false, null, {});
    };

    const setLoginState = async (loggedIn, token, user) => {
        cookie.save('auth', token);
        await setToken(token);
        await setLoggedIn(loggedIn);
        await setUser(user)
    };

    useEffect(() => {
        const qs = new URLSearchParams(window.location.search);
        const cookieToken = cookie.load('auth');
        const token = qs.get('token') || cookieToken || null;
        validateToken(token);
    }, [validateToken]);

    const state = {
        loggedIn,
        login,
        signup,
        logout,
        can: can,
        user,
        token,
    };
    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    );

}
export default LoginProvider;
