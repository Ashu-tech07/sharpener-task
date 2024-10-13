import React,{ Suspense } from "react";
import ProductList from "../products/ProductList";
// import About from "../layout/About";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../layout/Home";
// import ContactUs from "../layout/ContactUs";
// import ProductPage from "../products/ProductPage";
import AuthForm from "../auth/AuthForm";
import { useContext } from "react";
import AuthContext from "../store/auth-context";


const ContactUs= React.lazy(()=>import("../layout/ContactUs"));
const ProductPage= React.lazy(()=>import("../products/ProductPage"));
const About= React.lazy(()=>import("../layout/About"));

export const routePath = {
  Home: "/",
  Default: "*",
  Store: "/store",
  About: "/about",
  ContactUs: "/contact-us",
  ProductPage: "/store/product",
  Login: "/login",
};

const Routers = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Suspense fallback={<p>Loading.......</p>}>
      <Routes>
        <Route path={routePath.Home} element={<Home />} />
        <Route path={routePath.Default} element={<Home />} />
        <Route path={routePath.Store} element={authCtx.isLoggedIn ? (<ProductList />) : (<Navigate to={routePath.Login} />)} />
        <Route path={routePath.ProductPage} element={<ProductPage />} />
        <Route path={routePath.About} element={<About />} />
        <Route path={routePath.Login} element={<AuthForm />} />
        <Route path={routePath.ContactUs} element={<ContactUs />} />
      </Routes>
    </Suspense>
  );
};
export default Routers;