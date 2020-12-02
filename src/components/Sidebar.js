import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";
import { Button } from "@material-ui/core";
import axios from "../axios";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import { Link } from "react-router-dom";

const Sidebar = ({
  setCreateSubredditForm,
  setCreatePostForm,
  fromHome,
  setFromHome,
}) => {
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    axios.get("/trending").then((res) => {
      setTrending(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="Sidebar">
      <div className="Sidebar_top">
        <div className="Sidebar_title">
          <h3>Trending This Week</h3>
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
          <h3>Other Subreddits</h3>
        </div>
        <div className="Sidebar_button">
          <Button
            onClick={() => {
              setCreateSubredditForm(true);
              setCreatePostForm(false);
            }}
            type="submit"
          >
            Create a subreddit
          </Button>

          <Button
            onClick={() => {
              setCreatePostForm(true);
              setCreateSubredditForm(false);
              setFromHome(true);
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
