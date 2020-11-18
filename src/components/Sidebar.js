import React from "react";
import "../styles/Sidebar.css";
import { Button } from "@material-ui/core";

const Sidebar = ({ setCreateSubredditForm, setCreatePostForm }) => {
  return (
    <div className="Sidebar">
      <div className="Sidebar_top">
        <div className="Sidebar_title">
          <h3>Trending This Week</h3>
        </div>
        <div className="Sidebar_top_content"></div>
      </div>
      <div className="Sidebar_bottom">
        <div className="Sidebar_title">
          <h3>Other Subreddits</h3>
        </div>
        <div className="Sidebar_button">
          <Button onClick={() => {
            setCreateSubredditForm(true)
            setCreatePostForm(false)
            }} type="submit">
            Create a subreddit
          </Button>
          <Button onClick={() => {
            setCreatePostForm(true)
            setCreateSubredditForm(false)
            }} type="submit">Create a Post</Button>
        </div>
        <div className="Sidebar_bottom_content"></div>
      </div>
    </div>
  );
};

export default Sidebar;
