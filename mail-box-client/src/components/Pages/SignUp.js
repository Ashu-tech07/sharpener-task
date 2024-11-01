import classes from './SignUp.module.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isCursorAllow, setIsCursorAllow] = useState(true)
    const [isLogin, setIsLogin] = useState(true);
    
    const navigate=useNavigate();

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }

    const confirmPasswordChangeHandler = (e) => {
        setConfirmPassword(e.target.value)
        setIsCursorAllow(false)
    };

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState)
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if(!isLogin){
            if (confirmPassword !== password) {
                return alert('Confirm password and password is not same');
            }
        }

        let URL;

        if (!isLogin) {
            URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCBVdhVPT1l0oRoSxJ5a2VF5hMW6Cdxhw';
        } else {
            URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?keyy=AIzaSyBCBVdhVPT1l0oRoSxJ5a2VF5hMW6Cdxhw';
        }

        const singUp = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await singUp.json()
        console.log(data, 'data');

        if (!singUp.ok) {
            alert(data.error.message)
        } else {
            localStorage.setItem('token', data.idToken);
            console.log('sign up successfully');
            navigate('/');
        }

    }

    return (
        <>
            <section className={classes.auth}>
                <h1>{isLogin ? 'Login' : 'Create new account'}</h1>

                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input type='email' required onChange={emailChangeHandler} value={email} />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor='password'>Your Password</label>
                        <input type='password' required onChange={passwordChangeHandler} value={password} />
                    </div>

                    {!isLogin && <div className={classes.control}>
                        <label htmlFor='confpassword'>Confirm Password</label>
                        <input type='password' id='confpassword' required onChange={confirmPasswordChangeHandler} value={confirmPassword} />
                    </div>}
                    
                    <div className={classes.actions}>
                        {isLogin && <Link className={classes.forget} style={{ marginBottom: '5px', textDecoration: 'none' }} to='/forgotPassword'>Forgot Password ?</Link>}
                        <button type='submit' style={{ 'cursor': isCursorAllow ? 'not-allowed' : 'pointer' }} >{isLogin ? 'Login' : 'Create Account'}</button>
                        <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>{
                            isLogin ? "Don't have an account sign Up" : 'Login with existing account'
                        }</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default SignUp