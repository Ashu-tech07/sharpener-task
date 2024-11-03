import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getDatabase, ref, onValue, push, remove, get } from "firebase/database";
import "./Inbox.css";

const removeHTMLTags = (str) => {
    return str.replace(/<[^>]*>?/gm, '');
};

const Inbox = () => {
    const useremail = localStorage.getItem("UserMail");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const inboxRef = ref(db, `MailClient/${useremail.replace('.', '')}/ReceiveBox`);

        onValue(inboxRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const receivedMessages = Object.values(data);
                setMessages(receivedMessages);
            }
        });
    }, [useremail]);

    const StarMessage = async (MSG) => {
        const db = getDatabase();
        const useremailRef = useremail.replace('.', '');
        const starRef = ref(db, `MailClient/${useremailRef}/StarMessages`);

        const snapshot = await get(starRef);
        const data = snapshot.val();

        if (data) {
            const keys = Object.keys(data);
            const isMessageInStarred = keys.some((key) => {
                const message = data[key];
                return (
                    message.from === MSG.from &&
                    message.subject === MSG.subject &&
                    message.emailtext === MSG.emailtext
                );
            });

            if (isMessageInStarred) {
                alert("This message is already in the Star Section");
                return;
            }
        }

        push(starRef, MSG);
    };


    const TrashMessage = async (MSG) => {
        const db = getDatabase();
        const useremailRef = useremail.replace('.', '');
    
        const inboxRef = ref(db, `MailClient/${useremailRef}/ReceiveBox`);
        const starRef = ref(db, `MailClient/${useremailRef}/StarMessages`);
        const trashRef = ref(db, `MailClient/${useremailRef}/Trash`);
    
        try {
            await Promise.all([
                // Remove the message from ReceiveBox
                get(inboxRef).then((snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const keys = Object.keys(data);
                        keys.forEach((key) => {
                            const message = data[key];
                            if (message.from === MSG.from && message.subject === MSG.subject && message.emailtext === MSG.emailtext) {
                                const receiveBoxMsgRef = ref(db, `MailClient/${useremailRef}/ReceiveBox/${key}`);
                                remove(receiveBoxMsgRef);
                            }
                        });
                    }
                }),
    
                // Remove the message from StarMessages
                get(starRef).then((snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const keys = Object.keys(data);
                        keys.forEach((key) => {
                            const message = data[key];
                            if (message.from === MSG.from && message.subject === MSG.subject && message.emailtext === MSG.emailtext) {
                                const starMessageRef = ref(db, `MailClient/${useremailRef}/StarMessages/${key}`);
                                remove(starMessageRef);
                            }
                        });
                    }
                }),
    
                // Push the message to the Trash
                push(trashRef, MSG)
            ]);
    
            // Remove the message from the local state
            const updatedMessages = messages.filter((msg) => msg !== MSG);
            setMessages(updatedMessages);
        } catch (error) {
            console.error("Error removing message:", error);
        }
    };
    
    return (
        <>
            <div className="ListDiv">
                <p className="header">{useremail}, This Is Your Inbox Section.</p>
                <div className="list">
                    {messages.map((message, index) => (
                        <div key={index} className="list-item">
                            <p>From: {message.from}</p>
                            <p>Subject: {message.subject}</p>
                            <p>Message: {removeHTMLTags(message.emailtext)}</p>
                            <div className="btn-group">
                                <button onClick={() => StarMessage(message)} className="star-btn btn">
                                    <FontAwesomeIcon icon={faStar} size="sm" style={{ color: "#ffffff", }} />
                                    <p>Star</p>
                                </button>
                                <button onClick={() => TrashMessage(message)} className="trash-btn btn">
                                    <FontAwesomeIcon icon={faTrashCan} size="sm" style={{ color: "#ffffff", }} />
                                    <p>Trash</p>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Inbox;