import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRef } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./ComposeMail.css";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { showInbox } from "../store/uiSlice";

const ComposeMail = () => {
  const sendEmailTo = useRef();
  const mailSubject = useRef();
  const senderEmail = localStorage.getItem("userEmail");
  const [editorState, updateEditorState] = useState(EditorState.createEmpty());

  const dispatch = useDispatch();

  const handleComposeEmail = (event) => {
    event.preventDefault();
    const receiverEmail = sendEmailTo.current.value;
    const emailSubject = mailSubject.current.value;
    const emailDescription = convertToHTML(editorState.getCurrentContent());

    if (receiverEmail === "") {
      alert("*Please enter recipient email");
      return;
    }

    const seen = "unseen";

    const mailData = {
      id: uuidv4(),
      senderEmail,
      receiverEmail,
      emailSubject,
      emailDescription,
      date: new Date().toLocaleString(),
      seen,
    };

    const receiverEmailEdited = receiverEmail.replace("@", "").replace(".", "");
    const senderEmailEdited = senderEmail.replace("@", "").replace(".", "");

    fetch(
      `https://mail-box-client-559ae-default-rtdb.firebaseio.com/${receiverEmailEdited}/inbox.json`,
      {
        method: "POST",
        body: JSON.stringify(mailData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("receivedMail", data);
      })
      .catch((error) => {
        alert(error.message);
      });

    fetch(
      `https://mail-box-client-559ae-default-rtdb.firebaseio.com/${senderEmailEdited}/sentBox.json`,
      {
        method: "POST",
        body: JSON.stringify(mailData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("sentMail", data);
        sendEmailTo.current.value = "";
        mailSubject.current.value = "";
        updateEditorState("");
        dispatch(showInbox());
        // setEmailBody("");
      });
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 10,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#1976D2", fontWeight: "bold" }}
        >
          Compose Email
        </Typography>
        <Box component="form" onSubmit={handleComposeEmail} noValidate>
          <TextField
            id="email"
            label="To:"
            fullWidth
            variant="standard"
            type="email"
            name="email"
            inputRef={sendEmailTo}
          />
          <TextField
            id="standard-basic"
            label="Subject:"
            fullWidth
            variant="standard"
            type="text"
            inputRef={mailSubject}
          />
          <Box>
            <Editor
              type="text"
              editorState={editorState}
              onEditorStateChange={updateEditorState}
              // onChange={updateEmailBody}
              wrapperClassName="wrapper"
              editorClassName="editor"
              toolbarClassName="toolbar"
              required
            />
            <Button type="submit" variant="contained" sx={{ mt: 10, mb: 2 }}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ComposeMail;
