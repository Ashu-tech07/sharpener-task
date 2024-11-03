import React from "react";
import { app } from "../Database/Firebase";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faPen, faStar, faPaperPlane, faTrash, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import './Header.css';


const Header = () => {
    const navigate = useNavigate();
    
    const HandleLogOut = () => {
        const AUTH = getAuth(app);
        signOut(AUTH).then(() => {
            localStorage.removeItem("UserMail");
            navigate("/");
        }).catch(error => {
            console.log(error.message);
        });
    }
    return (
        <>
            <div className="header-nav">
                <div className="Ldiv">
                    <Link to="/MailBox/Compose" className="link">
                        Mail
                        <FontAwesomeIcon icon={faPen} size="sm" style={{ color: "#ffffff", }} />
                    </Link>
                </div>
                <div className="Ldiv">
                    <Link to="/MailBox/Inbox" className="link">
                        Inbox
                        <FontAwesomeIcon icon={faInbox} size="sm" style={{ color: "#ffffff", }} />
                    </Link>
                </div>
                <div className="Ldiv">
                    <Link to="/MailBox/Starred" className="link">
                        Starred
                        <FontAwesomeIcon icon={faStar} size="sm" style={{ color: "#ffffff", }} />
                    </Link>
                </div>
                <div className="Ldiv">
                    <Link to="/MailBox/Sent" className="link">
                        Sent
                        <FontAwesomeIcon icon={faPaperPlane} size="sm" style={{ color: "#ffffff", }} />
                    </Link>
                </div>
                <div className="Ldiv">
                    <Link to="/MailBox/Trash" className="link">
                        Trash
                        <FontAwesomeIcon icon={faTrash} size="sm" style={{ color: "#ffffff", }} />
                    </Link>
                </div>
                <div className="Ldiv">
                    <Link onClick={HandleLogOut} className="link">
                        Logout
                        <FontAwesomeIcon icon={faRightFromBracket} size="sm" style={{ color: "#ffffff", }} />
                    </Link>
                </div>
            </div>
        </>
    );
}
export default Header;