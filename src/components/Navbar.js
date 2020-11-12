import React, {useEffect} from "react";
import "../styles/Navbar.css";
import RedditIcon from "@material-ui/icons/Reddit";
import {
  SearchOutlined,
  MoreVert,
  AddIcCallRounded,
  PersonAddDisabled,
} from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../stateprovider";
import axios from "../axios";

function Navbar() {
  const [{ user }, dispatch] = useStateValue();

 

  const signUp = () => {
    axios.post("/users", { email: user.email }).then((res) => {
      if(user) user["user_id"] = res.data.user_id;
    });
  };

  const findId = () => {
    const header = { email: user.email };
    axios.get("/login", { headers: header }).then((res) => {
      if (res.data.length < 1) {
        signUp();
      } else {
        console.log(user);
        console.log(res.data[0].user_id);
        if (user) user["user_id"] = res.data[0].user_id;
          

      }
    });
  };

  const logIn = async () => {
    await auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });

        console.log(res.user.email);
      })
      .catch((error) => alert(error.message));
      
    user && findId()
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
        {!user && <Button onClick={() => logIn()}>log in</Button>}
        <IconButton>
          <MoreVert />
        </IconButton>
        {user && <Avatar src={user.photoURL} />}
      </div>
    </div>
  );
}

export default Navbar;
