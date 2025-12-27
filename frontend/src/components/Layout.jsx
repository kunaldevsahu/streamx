import React from "react";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="content-scroll">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
