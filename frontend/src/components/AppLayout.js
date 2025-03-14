import React from "react";
import { Input } from "antd";
import "./AppLayout.scss";
import LogoImage from "assets/logo.jpg";
import TopnavMenu from "components/TopnavMenu";
import MenuSidebar from "./MenuSidebar"
import SearchBar from "./SearchBar";
import {useAppContext} from "store";

function AppLayout({ children }) {
  const {store: {isAuthenticated}} = useAppContext()
  return (
    <div className="app">
      <div className="header">
        <a className="page-title" href="/">
          <img src={LogoImage} alt="logo" />
        </a>
        <div className="search">
          <SearchBar />
        </div>
        <div className="topnav">
          <TopnavMenu />
        </div>
      </div>
      <div className="menu-sidebar">
        { isAuthenticated && <MenuSidebar /> }
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
