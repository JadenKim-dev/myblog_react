import React from "react";
import { Input, Menu } from "antd";
import "./AppLayout.scss";
import LogoImage from "assets/logo.jpg";

function AppLayout({ children }) {
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <img src={LogoImage} alt="logo" />
        </h1>
        <div className="search">
          <Input.Search />
        </div>
        <div className="topnav">
          <Menu mode="horizontal" style={{ fontSize:"1.2em" }}>
            <Menu.Item>Login</Menu.Item>
            <Menu.Item>Logout</Menu.Item>
            <Menu.Item>회원가입</Menu.Item>
          </Menu>
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
