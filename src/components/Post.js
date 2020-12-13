import React, { useState, useEffect } from "react";
import "../styles/Post.css";
import { Link } from "react-router-dom";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { IconButton } from "@material-ui/core";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Truncate from "react-truncate";
import { useStateValue } from "../stateprovider";
import axios from "../axios";
import moment from "moment";

import { useHistory } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


const Post = ({
  post,
  fromProfilePage,
  profilePageUpdates,
  setProfilePageUpdates,
  editPost,
  setEditPost,
  setTitleInput,
  setDescriptionInput,
  setUrlInput,
  setId,
}) => {
  const history = useHistory();
  const [{ user }] = useStateValue();
  const [numOfComments, setNumOfComments] = useState(null);
  const [postUpvotes, setPostUpvotes] = useState(post.post_upvotes);
  const grey = "disabled";
  const blue = "primary";
  const [upvoteColor, setUpvoteColor] = useState(grey);
  const [downvoteColor, setDownvoteColor] = useState(grey);
  const defaultImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHLOsag5Yart674I1fvUvwF49v8wgofGpQtQ&usqp=CAU";

  useEffect(() => {
    axios.get(`/post/${post.post_id}`).then((res) => {
      setNumOfComments(res.data);
      if (user) {
        if (user.likedPosts.includes(post.post_id)) {
          changeUpvoteColor();
        } else if (user.dislikedPosts.includes(post.post_id)) {
          changeDownvoteColor();
        }
      }
    });
  }, []);

  const handleDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="DeletePostAlert_container">
            <h4>Delete post</h4>
            <h7>Are you sure you want to do this?</h7>
            <div className="DeletePostAlert_buttons">
              <button
                className="DeletePostAlert_deleteButton"
                onClick={() => {
                  deletePost();
                  onClose();
                }}
              >
                Confirm
              </button>
              <button
                className="DeletePostAlert_cancelButton"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const deletePost = async () => {
    await axios.delete(`/posts/${post.post_id}`);
    let newUpdate = profilePageUpdates + 1;
    setProfilePageUpdates(newUpdate);
  };

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

  console.log(editPost);
  console.log(post);

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
                  <img
                    className="Post_subreddit_img"
                    src="https://b.thumbs.redditmedia.com/8cMVsK9DKU-HJSM2WEG9mAGHIgd8-cEsnpJNJlB5NPw.png"
                  />
                  <Link
                    to={`/subreddits/${post.subreddit_id}`}
                    className="Post_subreddit_title"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h5 className="Post_title">{`r/${post.subreddit_title}`}</h5>
                  </Link>
                  <div className="Post_right_info">
                    &nbsp;&middot;&nbsp;
                    <h5>Posted by&nbsp;</h5>
                    {user && user.user_id == post.user_id ? (
                      <Link to="/profile" className="Post_user">
                        <h5>{`u/${post.email}`}</h5>
                      </Link>
                    ) : (
                      <Link
                        to={`/account/${post.user_id}`}
                        className="Post_user"
                      >
                        <h5>{`u/${post.email}`}</h5>
                      </Link>
                    )}
                  </div>
                  <h5 className="Post_time">
                    {moment(post.post_timestamp).fromNow()}
                  </h5>
                </div>
                <div className="title">
                  <h3>{post.post_title}</h3>
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
                <div className="Post_image">
                  {post.post_image && (
                    <img
                      src={`${post.post_image}`}
                      onError={(e) => e.target.setAttribute("src", defaultImg)}
                    />
                  )}
                </div>
              </div>

              <div className="Post_right_links">
                <div className="Post_numOfComments">
                  <ChatBubbleIcon fontSize={"small"} />
                  &nbsp;
                  {numOfComments && (
                    <>
                      {numOfComments[0] ? (
                        <h5>{`${numOfComments[0].comments} Comments`}</h5>
                      ) : (
                        <h5>0 Comments</h5>
                      )}
                    </>
                  )}
                </div>
                {user && fromProfilePage && (
                  <>
                    {user.user_id === post.user_id && (
                      <div className="Post_editDelete">
                        <Link
                          to={`/profile`}
                          style={{ textDecoration: "none", color: "grey" }}
                        >
                          <div
                            className="Post_edit"
                            onClick={() => {
                              setEditPost(true);
                              setTitleInput(post.post_title);
                              setDescriptionInput(post.post_content);
                              setUrlInput(post.post_image);
                              setId(post.post_id);
                            }}
                          >
                            <CreateRoundedIcon fontSize={"small"} />
                            <h5>Edit</h5>
                          </div>
                        </Link>
                        &nbsp;
                        <Link
                          to={`/profile`}
                          style={{ textDecoration: "none", color: "grey" }}
                        >
                          <div className="Post_delete" onClick={handleDelete}>
                            <DeleteRoundedIcon fontSize={"small"} />
                            <h5>Delete</h5>
                          </div>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
              {console.log("from profile page: ", fromProfilePage)}
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Post;
