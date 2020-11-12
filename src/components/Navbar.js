import React from "react";
import "../styles/Navbar.css";
import RedditIcon from "@material-ui/icons/Reddit";
import { SearchOutlined, MoreVert } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../stateprovider";

function Navbar() {
  const [{ user }, dispatch] = useStateValue();

  const logIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });

        console.log(res);
      })
      .catch((error) => alert(error.message));
  };

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
        {!user && <Button onClick={logIn}>log in</Button>}
        <IconButton>
          <MoreVert />
        </IconButton>
        {user && <Avatar src={user.photoURL} />}
      </div>
    </div>
  );
}

export default Navbar;
