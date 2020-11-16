import React from "react";
import "../styles/Post.css";
import { Link } from "react-router-dom";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import { IconButton } from "@material-ui/core";

const Post = ({ post }) => {
  const increaseLikes = () => {
    console.log("yo");
  };
  const decreaseLikes = () => {
    console.log("yo");
  };
  return (
    <div className="Post">
      <div className="Post_left">
        <IconButton onClick={increaseLikes}>
          <ArrowUpwardRoundedIcon />
        </IconButton>
        <div className="votes" style={{ color: "black" }}>
          <h5>{post.post_upvotes}</h5>
        </div>
        <IconButton onClick={decreaseLikes}>
          <ArrowDownwardRoundedIcon />
        </IconButton>
      </div>
      <div className="Post_right">
        <div className="Post_right_heading">
          <img src="https://b.thumbs.redditmedia.com/8cMVsK9DKU-HJSM2WEG9mAGHIgd8-cEsnpJNJlB5NPw.png" />
          <h4 className="Post_title">{`r/${post.subreddit_title}`}</h4>
          <div className="Post_right_info">
            &nbsp;&middot;&nbsp;
            <h4>Posted by&nbsp;</h4>
            <Link to={`/account/${post.user_id}`} className="Post_user">
              <h4>{post.email}</h4>
            </Link>
          </div>
          <h4>{post.post_timestamp}</h4>
        </div>
        <div className="Post_right_body">
          <p>{post.post_content}</p>
        </div>
        <div className="Post_right_links"></div>
      </div>
    </div>
  );
};

export default Post;
