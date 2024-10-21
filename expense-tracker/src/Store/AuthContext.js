import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login, logout } from './authSlice';

const AuthContext= createContext({
    token:"",
    email:"",
    isLoggedIn: false,
    login: (token,email)=>{},
    logout: ()=>{}
});

export const AuthContextProvider = (props)=>{

    const initialState=localStorage.getItem("token");
    const initialEmail = localStorage.getItem("email");

    const [token, setToken]= useState(initialState);
    const [email, setEmail] = useState(initialEmail);

    const dispatch = useDispatch();

    const userIsLoggedIn= !!token;

    const loginHandler=(token, email)=>{
        setToken(token);
        setEmail(email);
        localStorage.setItem("token",token);
        localStorage.setItem("email", email);

        dispatch(login({ email: email, token: token }))
    }

    const logoutHandler=()=>{
        setToken(null);
        setEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");

        dispatch(logout());
    }

    useEffect(()=>{
        let logoutTimer;
        if(userIsLoggedIn){
            logoutTimer=setTimeout(()=>{
                logoutHandler();
                alert("You have been logged out due to inactivity!!");
            }, 60 * 60 *1000)
        }

        return ()=>clearTimeout(logoutTimer);
    },[userIsLoggedIn])

    const contextValue={
        token:token,
        email:email,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;