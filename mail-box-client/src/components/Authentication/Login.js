import React, {useState} from "react";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Database/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './SignUp.css';

const Login = ({setIsLoggedIn}) => {

    const [uemail, setUemail] = useState("");
    const [upassword, setUpassword] = useState("");
    
    const [PasswordVisible, SetPasswordVisible] = useState(false);
    

    const navigate = useNavigate();

    const LogInHandler = (event) => {
        event.preventDefault();
        
        const AUTH = getAuth(app);
        signInWithEmailAndPassword(AUTH, uemail, upassword)
            .then(res => {
                console.log(res.user);
                setUemail("");
                setUpassword("");
            
                setIsLoggedIn(true);
                localStorage.setItem("UserMail", uemail);
                navigate("/MailBox");
            })
            .catch(error => console.log(error.message))
    }

    //Send Reset Password Email
    const HandleResetPassword = async () => {
        try {
            const AUTH = getAuth(app);
            await sendPasswordResetEmail(AUTH, uemail);
            alert(`Password Reset Mail Sent To The ${uemail}. Check Your Inbox`);
        } catch (error) {
            alert(error.message);
        }
    }
        
    const togglePasswordVisibility = () => {
        SetPasswordVisible(!PasswordVisible);
    }

    return (
        <>
            <div className="signup">
                <h1 className="signup-heading">User Log In Section!</h1>
            </div>
            <div className="signup-form-container">
                <form className="signup-form" onSubmit={LogInHandler}>
                    <div className="form-field">
                        <label className="label" htmlFor="useremail">User Email:</label>
                        <div className="input-div">
                            <input required className="input" type="email" autoComplete="user-email" placeholder="User Email" onChange={e => setUemail(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-field">
                        <label className="label" htmlFor="userpassword">User Password:</label>
                        <div className="input-div">
                            <input required className="input" type={PasswordVisible ? "text" : "password"} id="userpassword" placeholder="User Password" onChange={e => setUpassword(e.target.value)} />
                            <FontAwesomeIcon icon={PasswordVisible ? faEye : faEyeSlash} size="sm" style={{ color: "grey", cursor: "pointer", marginLeft:'5px' }} onClick={togglePasswordVisibility} />
                        </div>
                    </div>
                    <div className="login-div">
                        <Link className="lgn" to="/Signup">
                            Don't Have Any Account!
                        </Link>
                    </div>
                    <div className="btn-div">
                        <button className="forgot-btn" type="button" onClick={HandleResetPassword}>Forget Password</button>
                    </div>
                    <div className="btn-div">
                        <button className="btn login-btn" type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default Login;