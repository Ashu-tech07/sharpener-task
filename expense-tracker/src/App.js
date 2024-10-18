import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./Store/AuthContext";
import AuthContext from "./Store/AuthContext";
import { useContext } from "react";
import AuthForm from "./components/Auth/AuthForm";
import HomePage from "./components/Home/HomePage";
import ForgotPassword from "./components/Auth/ForgotPassword";


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {!authCtx.isLoggedIn && (
              <Route path="/auth" element={<AuthForm />} />
            )}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="*" element={<HomePage/>}/>
          </Routes>
        </Layout>
      </Router>
    </AuthContextProvider>
  );
}
export default App;
