import React from "react";
import "../styles/Navbar.css";
import RedditIcon from "@material-ui/icons/Reddit";
import { SearchOutlined, MoreVert } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../stateprovider";
import axios from "../axios";
import firebase from "firebase";
import { Link } from "react-router-dom";

function Navbar({ setCreateSubredditForm, setCreatePostForm }) {
  const [{ user }, dispatch] = useStateValue();

  const signUp = () => {
    axios.post("/users", { email: user.email }).then((res) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user["user_id"] = res.data.user_id;
          user["likedPosts"] = [];
          user["dislikedPosts"] = [];
          user["likedComments"] = [];
          user["dislikedComments"] = [];
          console.log(user);
        }
      });
    });
  };

  const findId = () => {
    const header = { email: user.email };
    axios.get("/login", { headers: header }).then((res) => {
      if (res.data.length < 1) {
        signUp();
      } else {
        console.log(res.data[0].user_id);
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            user["user_id"] = res.data[0].user_id;
            user["likedPosts"] = [];
            user["dislikedPosts"] = [];
            user["likedComments"] = [];
            user["dislikedComments"] = [];
            console.log(user);
          }
        });
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
  };

  return (
    <div className="Navbar">
      <Link
        to="/"
        onClick={() => {
          setCreateSubredditForm(false);
          setCreatePostForm(false);
        }}
        style={{ textDecoration: "none" }}
      >
        <div className="Navbar_left">
          <RedditIcon fontSize={"large"} />
          <div className="Navbar_title">
            <h2>reddit</h2>
          </div>
        </div>
      </Link>
      <div className="Navbar_search">
        <SearchOutlined />
        <input placeholder="Search" style={{ flex: "1" }} type="text" />
      </div>
      <div className="Navbar_right">
        {!user && <Button onClick={() => logIn()}>log in</Button>}
        <IconButton>
          <MoreVert />
        </IconButton>
        {user && (
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Avatar src={user.photoURL} />
          </Link>
        )}
        {user && findId()}
      </div>
    </div>
  );
}

export default Navbar;
