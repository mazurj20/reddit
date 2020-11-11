import React from "react";
import "../styles/Navbar.css";
import RedditIcon from "@material-ui/icons/Reddit";
import { SearchOutlined, MoreVert } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="Navbar_left">
        <RedditIcon />
        <div className="Navbar_title">
          <h2>reddit</h2>
        </div>
      </div>
      <div className="Navbar_search">
        <SearchOutlined />
        <input placeholder="Search" style={{ flex: "1" }} type="text" />
      </div>
      <div className="Navbar_right">
        <IconButton>
          <MoreVert />
        </IconButton>
        <Avatar />
      </div>
    </div>
  );
}

export default Navbar;
