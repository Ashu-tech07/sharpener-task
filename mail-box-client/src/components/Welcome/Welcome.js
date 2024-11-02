import React from "react";
import './Welcome.css';
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <>
            <div className="WLC-DIV">
                <div className="welcome-container">
                    <h1 className="WEL-HDR">Welcome To</h1>
                    <h1 className="WEL-HDR">Mail Client Project</h1>
                </div>
                <div className="welcome-container">
                    <p className="WEL-TXT">
                        In this mailbox client project, users can create accounts and send emails to other users. The application is built using React for the frontend, React Router for navigation, Redux Toolkit for state management, and Firebase Authentication and Firebase Realtime Database for user authentication and storing email data. Users can register, log in, compose emails, and send them to other users in a seamless and secure environment.
                    </p>
                </div>
                <div className="SGN-DIV">
                    <Link className="signup-btn" to="/Signup">SIGN UP</Link>
                </div>
            </div>
        </>
    );
}
export default Welcome;