import React from "react";
import "../styles/Post.css";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  return (
    <div className="post__element">
      <h1>{post.subreddit_title}</h1>
      <h3>{post.user_id}</h3>
      <h5>{post.post_upvotes}</h5>
      <Link to={`/account/${post.user_id}`} style={{ textDecoration: "none" }}>
        <h5>{post.email}</h5>
      </Link>
    </div>
  );
};

export default Post;
