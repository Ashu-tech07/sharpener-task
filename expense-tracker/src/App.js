import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./Store/AuthContext";
import AuthContext from "./Store/AuthContext";
import { useContext } from "react";
import MainPage from "./components/MainPage/MainPage";
import AuthForm from "./components/Auth/AuthForm";


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            {!authCtx.isLoggedIn && (
              <Route path="/auth" element={<AuthForm />} />
            )}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<MainPage/>}/>
          </Routes>
        </Layout>
      </Router>
    </AuthContextProvider>
  );
}
export default App;
