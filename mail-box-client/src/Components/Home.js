import React from "react";

import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import ComposeMail from "./ComposeMail";
import "./Home.css";
import Inbox from "./Inbox";
import SentBox from "./Sentbox";

const Home = () => {
  const showComposeMail = useSelector((state) => state.ui.composeMailVisible);
  const showInbox = useSelector((state) => state.ui.inboxVisible);
  const showSentbox = useSelector((state) => state.ui.sentboxVisible);
  
  return (
    <>
      <div className="body">
        <SideBar />
        {showInbox && <Inbox />}
        {showComposeMail && <ComposeMail />}
        {showSentbox && <SentBox />}
      </div>
    </>
  );
};

export default Home;
