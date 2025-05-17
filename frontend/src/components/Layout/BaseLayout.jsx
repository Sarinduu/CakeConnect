import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./baseLayoutStyle.css";

const BaseLayout = ({ children, showFooter = true }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-main">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default BaseLayout;