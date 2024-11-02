import React, {useState} from "react";
import {getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail} from "firebase/auth";
import {app} from "../Database/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './SignUp.css';

const SignUp = () => {

    const [uemail, setUemail] = useState("");
    const [upassword, setUpassword] = useState("");
    const [ucpassword, setUcpassword] = useState("");
    const [passwordVisible, SetPasswordVisible] = useState(false);
    const [cpasswordVisible, SetCPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const SignUpHandler = async (event) => {
        event.preventDefault();
        if (upassword !== ucpassword) {
            alert("Password Do Not Match!");
            return;
        }
        const AUTH = getAuth(app);
        try {
            const methods = await fetchSignInMethodsForEmail(AUTH, uemail);
            if (methods.length > 0) {
                alert(`${uemail} Is Already Exist`);
                return;
            }
            const res = await createUserWithEmailAndPassword(AUTH, uemail, upassword);
            console.log(res.user);
            alert(`${uemail} Created Successfully!`);
            setUemail(""); setUpassword(""); setUcpassword("");
            navigate("/Login");
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }

    const togglePasswordVisibility = () => {
        SetPasswordVisible(!passwordVisible);
    }
    const ctogglePasswordVisibility = () => {
        SetCPasswordVisible(!cpasswordVisible);
    }
    return (
        <>
            <div className="signup">
                <h1 className="signup-heading">User Sign Up Section!</h1>
            </div>
            <div className="signup-form-container">
                <form className="signup-form" onSubmit={SignUpHandler}>
                    <div className="form-field">
                        <label className="label" htmlFor="useremail">User Email:</label>
                        <div className="input-div">
                            <input required className="input" type="email" id="useremail" placeholder="User Email" onChange={e => setUemail(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-field">
                        <label className="label" htmlFor="userpassword">User Password:</label>
                        <div className="input-div">
                            <input required className="input" type={passwordVisible ? "text" : "password"} id="userpassword" placeholder="User Password" onChange={e => setUpassword(e.target.value)} />
                            <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} size="sm" style={{ color: "grey", cursor: "pointer", marginLeft:'5px' }} onClick={togglePasswordVisibility} />
                        </div>
                    </div>
                    <div className="form-field">
                        <label className="label" htmlFor="confirmpassword">Confirm Password:</label>
                        <div className="input-div">
                            <input required className="input" type={cpasswordVisible ? "text" : "password"} id='confirmpassword' placeholder="Confirm Password" onChange={e => setUcpassword(e.target.value)} />
                            <FontAwesomeIcon icon={cpasswordVisible ? faEye : faEyeSlash} size="sm" style={{ color: "grey", cursor: "pointer", marginLeft:'5px' }} onClick={ctogglePasswordVisibility} />
                        </div>
                    </div>
                    <div className="login-div">
                        <Link className="lgn" to="/Login">
                            Already Have Account!
                        </Link>
                    </div>
                    <div className="btn-div">
                        <button className="btn signup-btn" type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default SignUp;