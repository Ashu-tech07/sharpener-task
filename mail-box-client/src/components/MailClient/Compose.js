import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {getDatabase, ref, push} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { clearFields, selectMail, setSubject, setEmailText, setTo } from "../../redux/mailSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import 'quill-mention';
import './Compose.css';

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video', 'file'],
        ['clean']
    ],
    mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#"],
        source: function (searchTerm, renderList, mentionChar) {
            var values;
            if (mentionChar === "@") {
                values = [
                    { id: 1, value: 'fredrik', email: 'fredrik@fure.se', image: 'https://fure.se/fredrik.jpg' },
                    { id: 2, value: 'wille', email: 'wille@fure.se', image: 'https://fure.se/wille.jpg' }
                ];
            } else {
                values = [
                    { id: 3, value: 'bosse', email: 'bosse@fure.se', image: 'https://fure.se/bosse.jpg' }
                ];
            }
            if (searchTerm.length === 0) {
                renderList(values, searchTerm);
            } else {
                const matches = [];
                for (let i = 0; i < values.length; i++)
                    if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
                renderList(matches, searchTerm);
            }
        },
    },
    clipboard: {
        matchVisual: false,
    }
};

const Compose = () => {

    const useremail = localStorage.getItem("UserMail");
    const {to, subject, emailText} = useSelector(selectMail);
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
                    <ReactQuill theme="snow" className="editor" modules={modules} value={emailText} onChange={(value) => dispatch(setEmailText(value))} />

                    <div className="submit">
                        <button onClick={HandleSendMail} type="submit" className="submit-btn">
                            <p>Send Mail</p>
                            <FontAwesomeIcon icon={faEnvelope} size="lg" style={{color: "#ffffff",}} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default Compose;