import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import RedditIcon from "@material-ui/icons/Reddit";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../stateprovider";
import axios from "../axios";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AutoSuggest from "react-autosuggest";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Navbar({ setCreateSubredditForm, setCreatePostForm }) {
  const [{ user }, dispatch] = useStateValue();
  const [searchArr, setSearchArr] = useState([]);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownMenu, setDropdownMenu] = useState("hidden");
  const history = useHistory();

  useEffect(() => {
    axios.get("/subreddits").then((res) => setSearchArr(res.data));
  }, []);

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

  const handleLogout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='LogoutAlert_container'>
            <h4>Logout</h4>
            <h7>Are you sure you want to do this?</h7>
            <div className='LogoutAlert_buttons'>
              <button
                className='LogoutAlert_deleteButton'
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                Confirm
              </button>
              <button className='LogoutAlert_cancelButton' onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        );
      },
    });
  };
  const logout = () => {
    window.location.reload();
    return false;
  };

  const getSuggestions = (value) => {
    return options.filter((option) =>
      option.title.includes(value.trim().toLowerCase())
    );
  };

  const toggleDropdown = () => {
    dropdownMenu === "hidden"
      ? setDropdownMenu("visible")
      : setDropdownMenu("hidden");
  };

  return (
    <div className='Navbar'>
      <Link
        to='/'
        onClick={() => {
          setCreateSubredditForm(false);
          setCreatePostForm(false);
        }}
        style={{ textDecoration: "none" }}
      >
        <div className='Navbar_left'>
          <RedditIcon fontSize={"large"} />
          <div className='Navbar_title'>
            <h2>reddit</h2>
          </div>
        </div>
      </Link>
      <div className='Navbar_search'>
        <div className='Navbar_search_left'>
          <SearchIcon style={{ color: "grey", marginLeft: "5px" }} />
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
              onSubmit: select(),
            }}
            highlightFirstSuggestion={true}
          />
        </div>
      </div>
      <div className='Navbar_right'>
        <div>
          {!user && (
            <h5
              className='Navbar_login'
              style={{ cursor: "pointer" }}
              onClick={() => logIn()}
            >
              Login
            </h5>
          )}
        </div>
        {user && findId()}
        {user && (
          <>
            <div className='dropdown-menu-button'>
              <IconButton onClick={toggleDropdown}>
                <MoreVertIcon />
              </IconButton>
            </div>
            <Link to='/profile' style={{ textDecoration: "none" }}>
              <Avatar fontSize={"small"} src={user.photoURL} />
            </Link>
            <div className='dropdown-menu'>
              <div className={dropdownMenu}>
                <Link
                  to='/profile'
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={toggleDropdown}
                >
                  <h5 style={{ padding: "5px" }}>Account</h5>
                </Link>
                <h5
                  style={{ padding: "5px", cursor: "pointer" }}
                  className='Navbar_logout'
                  onClick={handleLogout}
                >
                  Logout
                </h5>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
