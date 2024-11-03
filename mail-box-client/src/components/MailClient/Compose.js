import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {getDatabase, ref, push} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { clearFields, setSubject, setEmailText, setTo } from "../../redux/mailSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import 'quill-mention';
import './Compose.css';

const Compose = () => {

    const useremail = localStorage.getItem("UserMail");
    const {to, subject, emailText} = useSelector((state) => state.mail);
    const dispatch = useDispatch();

    const HandleSendMail = (e) => {
        e.preventDefault();
        const EmailData = {
            from: useremail,
            to: to,
            subject: subject,
            emailtext: emailText,
        }

        //Firebase Work
        const db = getDatabase();
        push(ref(db,`MailClient/${EmailData.from.replace('.', '')}/SentBox`),EmailData);
        push(ref(db,`MailClient/${EmailData.to.replace('.', '')}/ReceiveBox`),EmailData);

        console.log(EmailData);
        dispatch(clearFields());
        setTo("");
        setSubject("");
        setEmailText("");
    }

    return (
        <>
            <div className="main-div">
                <div>
                    <p>{useremail}, This Is Your Compose Section.</p>
                </div>
                <form className="mail-form">
                    <input type="email" placeholder="To" className="input" value={to} onChange={(e)=>dispatch(setTo(e.target.value))} />
                    <input type="text" placeholder="Subject" className="input" value={subject} onChange={(e)=>dispatch(setSubject(e.target.value))} />
                    <ReactQuill theme="snow" className="editor" value={emailText} onChange={(value) => dispatch(setEmailText(value))} />

                    <div className="submit">
                        <button onClick={HandleSendMail} type="submit" className="submit-btn">
                            Send Mail
                            <FontAwesomeIcon icon={faEnvelope} size="lg" style={{color: "#ffffff",}} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default Compose;