import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "../../Store/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const navigate=useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState();

  const swithcAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if(!isLogin){
      const enteredPassword2 = confirmPasswordInputRef.current?.value;
      if (
        enteredEmail &&
        enteredPassword &&
        enteredPassword2 &&
        (enteredPassword === enteredPassword2)
      ) {
        setIsFormValid(true);
      } else if(enteredPassword !== enteredPassword2) {
          setError("Passwords didn't match");
          
        } else {
          setError("All Fields Are Required");
         
        }
    }

    setIsLoading(true);

    let URL;
    if (isLogin ) {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_8kdenpIeMebxIwDa8v3ED34bNDPgy5Y";
    } else if(isFormValid) {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_8kdenpIeMebxIwDa8v3ED34bNDPgy5Y";
    }

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          console.log("user created");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      {error && <p style={{ color: "red", textAlign: "start" }}>*{error}</p>}
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          {isLogin && (
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
          )}
          {!isLogin && (
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
              <label htmlFor="password">confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                rerquired
                ref={confirmPasswordInputRef}
              />
            </div>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <button>Sending request...</button>}
          <button
            type="button"
            className={classes.toggle}
            onClick={swithcAuthModeHandler}
          >
            {isLogin ? "Create new account" : "have an account? Login"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;