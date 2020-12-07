import React, { useState } from "react";
import "../styles/Post.css";
import { Link } from "react-router-dom";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { IconButton } from "@material-ui/core";
import Truncate from "react-truncate";
import { useStateValue } from "../stateprovider";
import axios from "../axios";

const Post = ({ post }) => {
  const [{ user }] = useStateValue();
  const [postUpvotes, setPostUpvotes] = useState(post.post_upvotes);
  const grey = "disabled";
  const blue = "primary";
  const [upvoteColor, setUpvoteColor] = useState(grey);
  const [downvoteColor, setDownvoteColor] = useState(grey);
  const defaultImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHLOsag5Yart674I1fvUvwF49v8wgofGpQtQ&usqp=CAU";

  const changeUpvoteColor = () => {
    let newColor = upvoteColor == grey ? blue : grey;
    setUpvoteColor(newColor);
  };
  const changeDownvoteColor = () => {
    let newColor = downvoteColor == grey ? blue : grey;
    setDownvoteColor(newColor);
  };

  const increaseLikes = (num) => {
    let updatedUpvotes = post.post_upvotes + num;
    axios.put(`/posts/${post.post_id}`, {
      post_upvotes: updatedUpvotes,
    });
    post.post_upvotes = updatedUpvotes;
    setPostUpvotes(updatedUpvotes);
    console.log(post);
  };
  const decreaseLikes = (num) => {
    let updatedUpvotes = post.post_upvotes - num;
    axios.put(`/posts/${post.post_id}`, {
      post_upvotes: updatedUpvotes,
    });
    post.post_upvotes = updatedUpvotes;
    setPostUpvotes(updatedUpvotes);
    console.log(post);
  };

  const handleLike = () => {
    if (user) {
      if (
        user.likedPosts.includes(post.post_id) === false &&
        user.dislikedPosts.includes(post.post_id) === false
      ) {
        user.likedPosts.push(post.post_id);
        increaseLikes(1);
        changeUpvoteColor();
      } else if (
        user.likedPosts.includes(post.post_id) === false &&
        user.dislikedPosts.includes(post.post_id) === true
      ) {
        let index = user.dislikedPosts.indexOf(post.post_id);
        if (index > -1) {
          user.dislikedPosts.splice(index, 1);
        }
        increaseLikes(2);
        user.likedPosts.push(post.post_id);
        changeUpvoteColor();
        changeDownvoteColor();
      } else if (
        user.likedPosts.includes(post.post_id) === true &&
        user.dislikedPosts.includes(post.post_id) === false
      ) {
        let index = user.likedPosts.indexOf(post.post_id);
        if (index > -1) {
          user.likedPosts.splice(index, 1);
        }
        decreaseLikes(1);
        changeUpvoteColor();
      }
      console.log("likes", user.likedPosts);
      console.log("dislikes", user.dislikedPosts);
    } else {
      alert("you must login to perform this action");
    }
  };
  const handleDislike = () => {
    if (user) {
      if (
        user.dislikedPosts.includes(post.post_id) === false &&
        user.likedPosts.includes(post.post_id) === false
      ) {
        user.dislikedPosts.push(post.post_id);
        decreaseLikes(1);
        changeDownvoteColor();
      } else if (
        user.dislikedPosts.includes(post.post_id) === false &&
        user.likedPosts.includes(post.post_id) === true
      ) {
        let index = user.likedPosts.indexOf(post.post_id);
        if (index > -1) {
          user.likedPosts.splice(index, 1);
        }
        user.dislikedPosts.push(post.post_id);
        decreaseLikes(2);
        changeDownvoteColor();
        changeUpvoteColor();
      } else if (
        user.dislikedPosts.includes(post.post_id) === true &&
        user.likedPosts.includes(post.post_id) === false
      ) {
        let index = user.dislikedPosts.indexOf(post.post_id);
        if (index > -1) {
          user.dislikedPosts.splice(index, 1);
        }
        increaseLikes(1);
        changeDownvoteColor();
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
            <IconButton onClick={handleLike}>
              <ArrowUpwardRoundedIcon color={upvoteColor} />
            </IconButton>
            <div className="votes" style={{ color: "black" }}>
              <h5>{postUpvotes}</h5>
            </div>
            <IconButton onClick={handleDislike}>
              <ArrowDownwardRoundedIcon color={downvoteColor} />
            </IconButton>
          </div>
          <Link
            to={`/posts/${post.post_id}`}
            style={{ textDecoration: "none", color: "black", width: "100%" }}
          >
            <div className="Post_right">
              <div className="Post_right_top">
                <div className="Post_right_heading">
                  <img src="https://b.thumbs.redditmedia.com/8cMVsK9DKU-HJSM2WEG9mAGHIgd8-cEsnpJNJlB5NPw.png" />
                  <Link
                    to={`/subreddits/${post.subreddit_id}`}
                    className="Post_subreddit_title"
                    style={{ textDecoration: "none", color: "black" }}
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
                        ...{" "}
                        <a
                          style={{ textDecoration: "none", color: "grey" }}
                          href="/link/to/article"
                        >
                          Read more
                        </a>
                      </span>
                    }
                  >
                    {post.post_content}
                  </Truncate>
                </div>
              </div>
              <div className="Post_image">
                {post.post_image && (
                  <img
                    src={`${post.post_image}`}
                    onError={(e) => e.target.setAttribute("src", defaultImg)}
                  />
                )}
              </div>
              <div className="Post_right_links">
                <ChatBubbleIcon fontSize={"small"} />
                &nbsp;
                <h5>3 comments</h5>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Post;
