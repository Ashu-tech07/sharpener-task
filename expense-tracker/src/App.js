// <<<<<<<<<<<<<<<<<<<------------Expense Tracker----------->>>>>>>>>>>>>>>>>>>
// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
// import UserProfile from "./components/Profile/UserProfile";
// import { BrowserRouter as Router } from "react-router-dom";
// import { AuthContextProvider } from "./Store/AuthContext";
// import AuthContext from "./Store/AuthContext";
// import { useContext } from "react";
// import AuthForm from "./components/Auth/AuthForm";
// import HomePage from "./components/Home/HomePage";
// import ForgotPassword from "./components/Auth/ForgotPassword";
// import { ExpenseContextProvider } from "./Store/ExpenseContext";
// import { useSelector } from "react-redux";


// function App() {

//   const authCtx = useContext(AuthContext);
//   const isDarkMode = useSelector((state) => state.theme.isDark);

//   return (
//     <div className={`${isDarkMode ? "darkTheme" : ""}`}>
//     <ExpenseContextProvider>
//     <AuthContextProvider>
//       <Router>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             {!authCtx.isLoggedIn && (
//               <Route path="/auth" element={<AuthForm />} />
//             )}
//             <Route path="/profile" element={<UserProfile />} />
//             <Route path="/forgot-password" element={<ForgotPassword/>} />
//             <Route path="*" element={<HomePage/>}/>
//           </Routes>
//         </Layout>
//       </Router>
//     </AuthContextProvider>
//     </ExpenseContextProvider>
//     </div>
//   );
// }
// export default App;


// <<<<<<<<<<<<<<<<<<<<<<<<<--------Shopping App------------>>>>>>>>>>>>>>>>>>>>

import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}
export default App;