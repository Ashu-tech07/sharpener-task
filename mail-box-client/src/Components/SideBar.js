import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./SideBar.css";
import InboxIcon from "@mui/icons-material/Inbox";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useDispatch } from "react-redux";
import { showCompose, showSent,showInbox } from "../store/uiSlice";

const SideBar = () => {
  const dispatch = useDispatch();

  const showComposeMail = () => {
    dispatch(showCompose());
  };
  const showInboxMail = () => {
    dispatch(showInbox());
  };
  const showsentBox = () => {
    dispatch(showSent());
  };

  return (
    <div className="sideBar">
      <Button
        startIcon={<AddIcon />}
        className="compose_btn"
        onClick={showComposeMail}
      >
        Compose
      </Button>
      <Button
        startIcon={<InboxIcon />}
        style={{ textTransform: "none" }}
        onClick={showInboxMail}
      >
        Inbox
      </Button>
      <Button
        startIcon={<MarkEmailReadIcon />}
        style={{ textTransform: "none" }}
        onClick={showsentBox}
      >
        Sent
      </Button>
    </div>
  );
};

export default SideBar;
