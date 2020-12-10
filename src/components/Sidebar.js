import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";
import { Button } from "@material-ui/core";
import axios from "../axios";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateprovider";

const Sidebar = ({
  setCreateSubredditForm,
  setCreatePostForm,
  fromHome,
  setFromHome,
}) => {
  const [trending, setTrending] = useState(null);
  const [{ user }] = useStateValue();

  useEffect(() => {
    axios.get("/trending").then((res) => {
      setTrending(res.data);
      console.log(res.data);
    });
  }, []);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="Sidebar">
      <div className="gddf">
        <div onClick={scrollTop} className="Sidebar_title">
          <h4>Back to Top</h4>
        </div>
      </div>
      <div className="Sidebar_top">
        <div className="Sidebar_title">
          <h4>Trending Communities</h4>
        </div>
        <div className="Sidebar_top_content">
          {trending && (
            <>
              {trending.map((subreddit) => (
                <div className="Sidebar_top_element">
                  <ArrowUpwardRoundedIcon />
                  <Link
                    to={`/subreddits/${subreddit.subreddit_id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h3>{`r/${subreddit.subreddit_title}`}</h3>
                    {console.log(subreddit)}
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="Sidebar_bottom">
        <div className="Sidebar_title">
          <h4>Share Your Thoughts</h4>
        </div>
        <div className="Sidebar_button">
          <Button
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
            onClick={() => {
              if (user) {
                setCreatePostForm(true);
                setCreateSubredditForm(false);
                setFromHome(true);
              } else {
                alert("log in");
              }
            }}
            type="submit"
          >
            Create a Post
          </Button>
        </div>
        <div className="Sidebar_bottom_content"></div>
      </div>
    </div>
  );
};
export default Sidebar;
