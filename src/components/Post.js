import React from "react";
import "../styles/Post.css";
import { Link } from "react-router-dom";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import { IconButton } from "@material-ui/core";
import Truncate from "react-truncate";

const Post = ({ post }) => {
  const increaseLikes = () => {
    console.log("yo");
  };
  const decreaseLikes = () => {
    console.log("yo");
  };
  return (
    <Link
      to={`/posts/${post.post_id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
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
            <Link
              to={`/subreddit/${post.subreddit_id}`}
              className="Post_subreddit_title"
            >
              <h4 className="Post_title">{`r/${post.subreddit_title}`}</h4>
            </Link>
            <div className="Post_right_info">
              &nbsp;&middot;&nbsp;
              <h4>Posted by&nbsp;</h4>
              <Link to={`/account/${post.user_id}`} className="Post_user">
                <h4>{`u/${post.email}`}</h4>
              </Link>
            </div>
            <h4 className="Post_time">{post.post_timestamp}</h4>
          </div>
          <div className="Post_right_body">
            <Truncate
              lines={3}
              ellipsis={
                <span>
                  ... <a href="/link/to/article">Read more</a>
                </span>
              }
            >
              {post.post_content}
            </Truncate>
          </div>
          <div className="Post_image">
            {post.post_image && <img src={`${post.post_image}`} />}
          </div>
          <div className="Post_right_links"></div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
