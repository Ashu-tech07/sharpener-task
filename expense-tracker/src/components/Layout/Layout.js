import React from "react";
import MainNavigation from "./MainNavigation";
import MainHeader from './MainHeader';

const Layout = (props) => {
  return (
    <>
      {/* <<-- Expense Tracker header-->> */}
      {/* <MainNavigation /> */}

      {/* <<--Shooping App header -->> */}
      <MainHeader />

      <main>{props.children}</main>
    </>
  );
};
export default Layout;