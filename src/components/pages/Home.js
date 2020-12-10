import React, { useState, useEffect } from "react";
import "../../styles/Home.css";
import Sidebar from "../Sidebar";
import NewSubreddit from "../newSubreddit";
import NewPost from "../newPost";
import Post from "../Post";
import axios from "../../axios";
import { Button } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useStateValue } from "../../stateprovider";

const Home = ({
  createSubredditForm,
  setCreateSubredditForm,
  createPostForm,
  setCreatePostForm,
  value,
  setValue,
  fromHome,
  setFromHome,
}) => {
  const [{ user }] = useStateValue();
  const [popularPosts, setPopularPosts] = useState(null);
  const location = useLocation();
  if (location.state) {
    const id = location.state.id;
  }
  console.log(value);
  useEffect(() => {
    axios.get(`/popular`).then((res) => {
      setPopularPosts(res.data);
    });
  }, []);
  const ifTrue = () => {
    if (createSubredditForm) {
      return "subreddit";
    } else if (createPostForm) {
      return "post";
    }
  };
  return (
    <>
      <Sidebar
        className="Sidebar"
        setCreateSubredditForm={setCreateSubredditForm}
        setCreatePostForm={setCreatePostForm}
        fromHome={fromHome}
        setFromHome={setFromHome}
      />
      <div className="Home">
        {(() => {
          switch (ifTrue()) {
            case "subreddit":
              return (
                <NewSubreddit setCreateSubredditForm={setCreateSubredditForm} />
              );
            case "post":
              return (
                <NewPost
                  setValue={setValue}
                  value={value}
                  setCreatePostForm={setCreatePostForm}
                  fromHome={fromHome}
                  setFromHome={setFromHome}
                />
              );
            default:
              return (
                <div>
                  {popularPosts && (
                    <>
                      <div className="Home_buttons">
                        <Button
                          style={{ fontSize: "10px" }}
                          className="Subreddit_button"
                          onClick={() => {
                            if (user) {
                              setCreateSubredditForm(true);
                              setCreatePostForm(false);
                            } else {
                              alert("log in");
                            }
                          }}
                          type="submit"
                        >
                          Create a subreddit
                        </Button>
                        <Button
                          style={{ fontSize: "10px" }}
                          onClick={() => {
                            if (user) {
                              setCreatePostForm(true);
                              setFromHome(true);
                            } else {
                              alert("log in");
                            }
                          }}
                        >
                          Create a post
                        </Button>
                      </div>
                      <div className="Home_posts">
                        {popularPosts.map((post) => (
                          <Post post={post} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
          }
        })()}
      </div>
    </>
  );
};

export default Home;
