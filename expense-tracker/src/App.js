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

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import Notification from "./components/UI/Notification";
import { showNotification } from "./Store/uiSlice";
import { fetchCartData, sendCartData } from "./Store/cartActions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
 
  // <<<<<<<<<<<<<<<--- async task using useEffect ---->>>>>>>>>>>>>>
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(showNotification({
  //         status: "pending",
  //         title: "Sending...",
  //         message: "Sending cart data!",
  //       })
  //     );
  //     const response = await fetch(
  //       "https://sharpener-movies-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Sending cart data failed.");
  //     }
  //     dispatch(showNotification({
  //         status: "success",
  //         title: "Success!",
  //         message: "Sent cart data successfully!",
  //       })
  //     );
  //   };
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) => {
  //     dispatch(showNotification({
  //         status: "error",
  //         title: "Error!",
  //         message: "Sending cart data failed!!",
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  // <<<<<<<<<<<<<<<-- async task using action creators (Thunk)--->>>>>>>>
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}
export default App;