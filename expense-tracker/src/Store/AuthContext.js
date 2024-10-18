import React, { createContext, useEffect, useState } from 'react';

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

    const userIsLoggedIn= !!token;

    const loginHandler=(token, email)=>{
        setToken(token);
        setEmail(email);
        localStorage.setItem("token",token);
        localStorage.setItem("email", email);
    }

    const logoutHandler=()=>{
        setToken(null);
        setEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    }

    useEffect(()=>{
        let logoutTimer;
        if(userIsLoggedIn){
            logoutTimer=setTimeout(()=>{
                logoutHandler();
                alert("You have been logged out due to inactivity!!");
            }, 20 * 60 *1000)
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