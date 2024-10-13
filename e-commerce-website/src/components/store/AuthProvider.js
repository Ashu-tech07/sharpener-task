import React, { useEffect, useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
      setToken(token);
      localStorage.setItem("token", token);
    };

    const logoutHandler = () => {
      setToken(null);
      localStorage.removeItem("token");
    };

    useEffect(() => {
      let logoutTimer;
      if (userIsLoggedIn) {
        logoutTimer = setTimeout(() => {
          logoutHandler();
          alert("You have been logged out due to inactivity.");
        }, 5 * 60 * 1000);
      }
      return () => clearTimeout(logoutTimer);
    }, [userIsLoggedIn]);
  

    const contextValue = {
      token: token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    };
    
    return (
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;