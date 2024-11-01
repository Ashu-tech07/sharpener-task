import classes from './Welcome.module.css';
import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/authSlice';

const Welcome = () => {

  const dispatch=useDispatch()

  const logoutHandler =()=>{
    dispatch(logout());
  }
  return (
    <>
      <div>Welcome</div>
<button onClick={logoutHandler}>Logout</button>
    </>
  )
}
export default Welcome