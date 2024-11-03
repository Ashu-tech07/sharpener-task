import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from './components/Database/Firebase';
import './App.css';
import Welcome from './components/Welcome/Welcome';
import SignUp from './components/Authentication/SignUp';
import Login from './components/Authentication/Login';
import Compose from './components/MailClient/Compose';
import MailClient from './components/MailClient/MailClient';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/MailBox" /> : <Welcome />} />
      <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/MailBox/*" element={<MailClient setIsLoggedIn={setIsLoggedIn} />} >
        <Route path="Compose" element={<Compose />} />
      </Route>
    </Routes>
  );
};
export default App;