import React from "react";
import { Input } from "antd";
import "./AppLayout.scss";
import LogoImage from "assets/logo.jpg";
import TopnavMenu from "components/TopnavMenu";

function AppLayout({ children }) {  
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <img src={LogoImage} alt="logo" />
        </h1>
        <div className="search">
          <Input.Search size="large"/>
        </div>
        <div className="topnav">
          <TopnavMenu />
        </div>
      </div>
      <div className="menu-sidebar">
        menu-sidebar
      </div>
      <div className="contents">{children}</div>
      <div className="suggestion-sidebar">
        suggestion-sidebar
      </div>
      <div className="footer">
        &copy; 2020. Jaden Kim.
      </div>
    </div>
  )
}
export default AppLayout;
