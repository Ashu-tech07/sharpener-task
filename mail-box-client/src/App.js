import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/Login";
import Home from "./Components/Home";
import ViewMail from "./Components/ViewMail";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/viewMail/:id" element={<ViewMail />} />
      </Routes>
    </>
  );
}

export default App;
