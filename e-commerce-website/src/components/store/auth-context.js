import { createContext } from "react";

const AuthContext = createContext({
    token: "",
    email:"",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
  });

  export default AuthContext;