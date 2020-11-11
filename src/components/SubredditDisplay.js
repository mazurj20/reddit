import React from "react";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import { IconButton } from "@material-ui/core";
import "../styles/SubredditDisplay.css";

const SubredditDisplay = () => {
  return (
    <div>
      <div className="post">
        <div className="post__left">
          <IconButton>
            <ArrowUpwardRoundedIcon />
          </IconButton>
          <div className="votes" style={{ color: "black" }}>
            13
          </div>
          <IconButton>
            <ArrowDownwardRoundedIcon />
          </IconButton>
        </div>
        <div className="post__right">
          <>
            <h1 className="post__title">title</h1>
            <p className="post__contents">content</p>
          </>
        </div>
      </div>
    </div>
  );
};

export default SubredditDisplay;
