import React, { useEffect, useState } from "react";
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
import Search from "react-search";
import { useHistory } from "react-router-dom";

function Navbar({ setCreateSubredditForm, setCreatePostForm }) {
  const [{ user }, dispatch] = useStateValue();
  const [searchArr, setSearchArr] = useState([]);
  const [value, setValue] = useState({});
  const history = useHistory();

  useEffect(() => {
    axios.get("/subreddits").then((res) => setSearchArr(res.data));
  }, []);

  console.log(searchArr);

  let options = [];
  searchArr.map((sub) => {
    options.push({
      id: sub.subreddit_id,
      value: sub.subreddit_title,
    });
    return options;
  });

  console.log(options);

  console.log(value);

  const select = () => {
    history.push({
      pathname: `/subreddits/${value[0].id}`,
    });
  };

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

  const handleLogout = () => {
    console.log("dsd");
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
        <Search
          items={options}
          placeholder="Find a community"
          onItemsChanged={setValue}
          maxSelected={1}
        />
        <button onClick={select}>enter</button>
      </div>
      {user ? (
        <h4 onClick={handleLogout}>LOGOUT</h4>
      ) : (
        <div className="Navbar_right">
          {!user && <Button onClick={() => logIn()}>log in</Button>}

          {user && findId()}
        </div>
      )}
      {user && (
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Avatar src={user.photoURL} />
        </Link>
      )}
    </div>
  );
}

export default Navbar;
