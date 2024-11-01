import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './ForgotPassword.module.css'

const ForgotPassword = () => {

    const [email,setEmail]=useState();
    const [sending,setSending]=useState(false);

    const navigate=useNavigate();

    const emailChangeHandler=(e)=>{
        setEmail(e.target.value);
    }

    const URL='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBCBVdhVPT1l0oRoSxJ5a2VF5hMW6Cdxhw'

    const submitHandler=(e)=>{

        e.preventDefault();

        setSending(true);

        fetch(URL,{
            method:'POST',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:email
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            setSending(false)
            const resp=res.json();
            resp.then((data)=>{
                console.log(data);
                if(data.error){
                    alert(data.error.message)
                }else{
                    alert('Check your email inbox and reset password');
                    navigate('/');
                }
               
            })
        }).catch((err)=>{
            setSending(false)
            console.log(err);
        })
    }
  return (
    <>
        <div className={classes.main}>
            
            <div className={classes.form}>
                <label htmlFor='email'>Enter the email with which you have registerd</label>
                <input type='email' id='email' onChange={emailChangeHandler} value={email}/>
               {!sending && <button type='submit' onClick={submitHandler}>Send link</button>}
               {sending && <p>Sending request...</p>}
                <Link to="/">Already a user ? Login</Link>
            </div>
        </div>
    </>
  )
}
export default ForgotPassword