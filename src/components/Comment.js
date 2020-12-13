import React, { useState, useEffect } from "react";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { IconButton } from "@material-ui/core";
import "../styles/Comment.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateprovider";
import axios from "../axios";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Comment = ({
  comment,
  updateCommentSection,
  setUpdateCommentSection,
}) => {
  const [{ user }] = useStateValue();
  const [commentUpvotes, setCommentUpvotes] = useState(comment.comment_upvotes);
  const grey = "disabled";
  const blue = "primary";
  const [upvoteColor, setUpvoteColor] = useState(grey);
  const [downvoteColor, setDownvoteColor] = useState(grey);

  useEffect(() => {
    if (user) {
      if (user.likedComments.includes(comment.comment_id)) {
        changeUpvoteColor();
      } else if (user.dislikedComments.includes(comment.comment_id)) {
        changeDownvoteColor();
      }
    }
  }, []);

  const handleDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="DeleteCommentAlert_container">
            <h4>Delete comment</h4>
            <h7>Are you sure you want to do this?</h7>
            <div className="DeleteCommentAlert_buttons">
              <button
                className="DeleteCommentAlert_deleteButton"
                onClick={() => {
                  deleteComment();
                  onClose();
                }}
              >
                Confirm
              </button>
              <button
                className="DeleteCommentAlert_cancelButton"
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

  const deleteComment = async () => {
    await axios.delete(`/comments/${comment.comment_id}`);
    let newUpdate = updateCommentSection + 1;
    setUpdateCommentSection(newUpdate);
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
    let updatedUpvotes = comment.comment_upvotes + num;
    axios.put(`/comments/${comment.comment_id}`, {
      comment_upvotes: updatedUpvotes,
    });
    comment.comment_upvotes = updatedUpvotes;
    setCommentUpvotes(updatedUpvotes);
    console.log(comment);
  };
  const decreaseLikes = (num) => {
    let updatedUpvotes = comment.comment_upvotes - num;
    axios.put(`/comments/${comment.comment_id}`, {
      comment_upvotes: updatedUpvotes,
    });
    comment.comment_upvotes = updatedUpvotes;
    setCommentUpvotes(updatedUpvotes);
    console.log(comment);
  };

  const handleLike = () => {
    if (user) {
      if (
        user.likedComments.includes(comment.comment_id) === false &&
        user.dislikedComments.includes(comment.comment_id) === false
      ) {
        user.likedComments.push(comment.comment_id);
        increaseLikes(1);
        changeUpvoteColor();
      } else if (
        user.likedComments.includes(comment.comment_id) === false &&
        user.dislikedComments.includes(comment.comment_id) === true
      ) {
        let index = user.dislikedComments.indexOf(comment.comment_id);
        if (index > -1) {
          user.dislikedComments.splice(index, 1);
        }
        increaseLikes(2);
        user.likedComments.push(comment.comment_id);
        changeUpvoteColor();
        changeDownvoteColor();
      } else if (
        user.likedComments.includes(comment.comment_id) === true &&
        user.dislikedComments.includes(comment.comment_id) === false
      ) {
        let index = user.likedComments.indexOf(comment.comment_id);
        if (index > -1) {
          user.likedComments.splice(index, 1);
        }
        decreaseLikes(1);
        changeUpvoteColor();
      }
      console.log("likes", user.likedComments);
      console.log("dislikes", user.dislikedComments);
    } else {
      alert("you must login to perform this action");
    }
  };
  const handleDislike = () => {
    if (user) {
      if (
        user.dislikedComments.includes(comment.comment_id) === false &&
        user.likedComments.includes(comment.comment_id) === false
      ) {
        user.dislikedComments.push(comment.comment_id);
        decreaseLikes(1);
        changeDownvoteColor();
      } else if (
        user.dislikedComments.includes(comment.comment_id) === false &&
        user.likedComments.includes(comment.comment_id) === true
      ) {
        let index = user.likedComments.indexOf(comment.comment_id);
        if (index > -1) {
          user.likedComments.splice(index, 1);
        }
        user.dislikedComments.push(comment.comment_id);
        decreaseLikes(2);
        changeDownvoteColor();
        changeUpvoteColor();
      } else if (
        user.dislikedComments.includes(comment.comment_id) === true &&
        user.likedComments.includes(comment.comment_id) === false
      ) {
        let index = user.dislikedComments.indexOf(comment.comment_id);
        if (index > -1) {
          user.dislikedComments.splice(index, 1);
        }
        increaseLikes(1);
        changeDownvoteColor();
      }
      console.log("likes", user.likedComments);
      console.log("dislikes", user.dislikedComments);
    } else {
      alert("you must login to perform this action");
    }
  };
  return (
    <div className="Comment">
      <div className="Comment_left">
        <IconButton fontSize={"small"} onClick={handleLike}>
          <ArrowUpwardRoundedIcon fontSize={"small"} color={upvoteColor} />
        </IconButton>
        <div className="votes" style={{ color: "black" }}>
          <h6>{commentUpvotes}</h6>
        </div>
        <IconButton fontSize={"small"} onClick={handleDislike}>
          <ArrowDownwardRoundedIcon fontSize={"small"} color={downvoteColor} />
        </IconButton>
      </div>
      <div className="Comment_right">
        <div className="Comment_header">
          <div className="Comment_header_left">
            <h5>Posted by&nbsp;</h5>
            <Link to={`/account/${comment.user_id}`} className="Comment_user">
              <h5>{`u/${comment.email}`}</h5>
            </Link>
          </div>
          <h5 className="Comment_time">
            {moment(comment.comment_timestamp).fromNow()}
          </h5>
        </div>
        <div className="Comment_body">
          <h6>{comment.comment_content}</h6>
        </div>
        {user && (
          <div className="Comment_delete_container">
            {user.user_id == comment.user_id && (
              <div className="Comment_delete" onClick={handleDelete}>
                <DeleteRoundedIcon fontSize={"small"} />
                <h5>Delete</h5>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
