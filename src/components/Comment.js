import React from "react";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import { IconButton } from "@material-ui/core";
import "../styles/Comment.css";

const Comment = ({ comment }) => {
  const increaseLikes = () => {
    console.log("yo");
  };
  const decreaseLikes = () => {
    console.log("yo");
  };
  return (
    <div className="Comment">
      <div className="Comment_left">
        <IconButton onClick={increaseLikes}>
          <ArrowUpwardRoundedIcon />
        </IconButton>
        <div className="votes" style={{ color: "black" }}>
          <h5>{comment.comment_upvotes}</h5>
        </div>
        <IconButton onClick={decreaseLikes}>
          <ArrowDownwardRoundedIcon />
        </IconButton>
      </div>
      <div className="Comment_right">
        <div className="Comment_header">
          <h2>{comment.email}</h2>
          <h2>{comment.comment_timestamp}</h2>
        </div>
        <div className="Comment_body">
          <h3>{comment.comment_content}</h3>
        </div>
      </div>
    </div>
  );
};

export default Comment;
