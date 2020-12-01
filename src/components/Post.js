import React, { useState } from "react";
import "../styles/Post.css";
import { Link } from "react-router-dom";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import { IconButton } from "@material-ui/core";
import Truncate from "react-truncate";
import { useStateValue } from "../stateprovider";
import axios from "../axios";
import { makeStyles } from "@material-ui/core/styles";

const Post = ({ post }) => {
  const [{ user }] = useStateValue();
  const [postUpvotes, setPostUpvotes] = useState(post.post_upvotes);
  /*
  const useStyles = makeStyles({
    root: {
      color: rgb(29, 133, 194),
    },
  });

  const BiggerListItemIcon = withStyles({
    root: {
      "& .MuiSvgIcon-root": { fontSize: "2em" },
    },
  })(ArrowUpwardRoundedIcon);

  const BiggerListItemIcon2 = withStyles({
    root: {
      "& .MuiSvgIcon-root": { fontSize: "2em" },
    },
  })(ArrowDownwardRoundedIcon);
*/
  const increaseLikes2 = () => {
    let updatedUpvotes = post.post_upvotes + 1;
    axios.put(`/posts/${post.post_id}`, {
      post_upvotes: updatedUpvotes,
    });
    post.post_upvotes = updatedUpvotes;
    setPostUpvotes(updatedUpvotes);
    console.log(post);
  };
  const decreaseLikes2 = () => {
    let updatedUpvotes = post.post_upvotes - 1;
    axios.put(`/posts/${post.post_id}`, {
      post_upvotes: updatedUpvotes,
    });
    post.post_upvotes = updatedUpvotes;
    setPostUpvotes(updatedUpvotes);
    console.log(post);
  };

  const increaseLikes = () => {
    if (user) {
      if (
        user.likedPosts.includes(post.post_id) === false &&
        user.dislikedPosts.includes(post.post_id) === false
      ) {
        user.likedPosts.push(post.post_id);
        increaseLikes2();
      } else if (
        user.likedPosts.includes(post.post_id) === false &&
        user.dislikedPosts.includes(post.post_id) === true
      ) {
        let index = user.dislikedPosts.indexOf(post.post_id);
        if (index > -1) {
          user.dislikedPosts.splice(index, 1);
        }
        increaseLikes2();
      } else if (
        user.likedPosts.includes(post.post_id) === true &&
        user.dislikedPosts.includes(post.post_id) === false
      ) {
        let index = user.likedPosts.indexOf(post.post_id);
        if (index > -1) {
          user.likedPosts.splice(index, 1);
        }
        decreaseLikes2();
      }
      console.log("likes", user.likedPosts);
      console.log("dislikes", user.dislikedPosts);
    } else {
      alert("you must login to perform this action");
    }
  };
  const decreaseLikes = () => {
    if (user) {
      if (
        user.dislikedPosts.includes(post.post_id) === false &&
        user.likedPosts.includes(post.post_id) === false
      ) {
        user.dislikedPosts.push(post.post_id);
        decreaseLikes2();
      } else if (
        user.dislikedPosts.includes(post.post_id) === false &&
        user.likedPosts.includes(post.post_id) === true
      ) {
        let index = user.likedPosts.indexOf(post.post_id);
        if (index > -1) {
          user.likedPosts.splice(index, 1);
        }
        decreaseLikes2();
      } else if (
        user.dislikedPosts.includes(post.post_id) === true &&
        user.likedPosts.includes(post.post_id) === false
      ) {
        let index = user.dislikedPosts.indexOf(post.post_id);
        if (index > -1) {
          user.dislikedPosts.splice(index, 1);
        }
        increaseLikes2();
      }
      console.log("likes", user.likedPosts);
      console.log("dislikes", user.dislikedPosts);
    } else {
      alert("you must login to perform this action");
    }
  };
  return (
    <>
      {post && (
        <div className="Post">
          <div className="Post_left">
            <IconButton onClick={increaseLikes}>
              <ArrowUpwardRoundedIcon />
            </IconButton>
            <div className="votes" style={{ color: "black" }}>
              <h5>{postUpvotes}</h5>
            </div>
            <IconButton onClick={decreaseLikes}>
              <ArrowDownwardRoundedIcon />
            </IconButton>
          </div>
          <Link
            to={`/posts/${post.post_id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="Post_right">
              <div className="Post_right_heading">
                <img src="https://b.thumbs.redditmedia.com/8cMVsK9DKU-HJSM2WEG9mAGHIgd8-cEsnpJNJlB5NPw.png" />
                <Link
                  to={`/subreddits/${post.subreddit_id}`}
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
          </Link>
        </div>
      )}
    </>
  );
};

export default Post;
