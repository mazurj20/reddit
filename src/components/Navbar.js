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
import { useHistory } from "react-router-dom";
import AutoSuggest from "react-autosuggest";

function Navbar({ setCreateSubredditForm, setCreatePostForm }) {
  const [{ user }, dispatch] = useStateValue();
  const [searchArr, setSearchArr] = useState([]);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get("/subreddits").then((res) => setSearchArr(res.data));
  }, []);

  console.log(searchArr);

  let options = [];
  searchArr.map((sub) => {
    options.push({
      id: sub.subreddit_id,
      title: sub.subreddit_title.toLowerCase(),
    });
    return options;
  });

  console.log(options);

  console.log(value);

  const select = () => {
    for (let option of options) {
      if (option.title === value) {
        history.push({
          pathname: `/subreddits/${option.id}`,
        });
      }
    }
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

  function getSuggestions(value) {
    return options.filter((option) =>
      option.title.includes(value.trim().toLowerCase())
    );
  }

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
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsClearRequested={() => setSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            console.log(value);
            setValue(value);
            setSuggestions(getSuggestions(value));
          }}
          onSuggestionSelected={(_, { suggestionValue }) =>
            console.log("Selected: " + suggestionValue)
          }
          getSuggestionValue={(suggestion) => suggestion.title}
          renderSuggestion={(suggestion) => <span>{suggestion.title}</span>}
          inputProps={{
            placeholder: "find a community",
            value: value,
            onChange: (_, { newValue, method }) => {
              setValue(newValue);
            },
          }}
          highlightFirstSuggestion={true}
        />
        <button onClick={select}>submit</button>
      </div>
      <div className="Navbar_right">
        {!user && <Button onClick={() => logIn()}>log in</Button>}
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
