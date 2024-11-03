import React, { useEffect } from "react";
import Header from "../Welcome/Header";
import { app } from "../Database/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Outlet } from "react-router-dom";
import './MailClient.css';

const MailClient = ({ setIsLoggedIn }) => {
    useEffect(() => {
        const Auth = getAuth(app);
        const unSubscribe = onAuthStateChanged(Auth, (user) => {
            if (user) {
                localStorage.setItem("UserMail", user.email);
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem("UserMail");
                setIsLoggedIn(false);
            }
        });

        return () => unSubscribe();
    }, [setIsLoggedIn]);

    return (
        <>
                <div className="Mail-Client-Div">
                    <div className="SideBar">
                        <Header />
                    </div>
                    <div className="MailBar">
                       <Outlet />
                    </div>
                </div>
        </>
    );
}
export default MailClient;