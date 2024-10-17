import React, { createContext, useEffect, useState } from 'react';

const AuthContext= createContext({
    token:"",
    isLoggedIn: false,
    login: (token)=>{},
    logout: ()=>{}
});

export const AuthContextProvider = (props)=>{

    const initialState=localStorage.getItem("token");
    const [token, setToken]= useState(initialState);

    const userIsLoggedIn= !!token;

    const loginHandler=(token)=>{
        setToken(token);
        localStorage.setItem("token",token);
    }

    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem("token");
    }

    useEffect(()=>{
        let logoutTimer;
        if(userIsLoggedIn){
            logoutTimer=setTimeout(()=>{
                logoutHandler();
                alert("You have been logged out due to inactivity!!");
            }, 5 * 60 *1000)
        }

        return ()=>clearTimeout(logoutTimer);
    },[userIsLoggedIn])

    const contextValue={
        token:token,
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