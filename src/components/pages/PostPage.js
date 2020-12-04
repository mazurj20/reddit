import React, { useState, useEffect } from "react";
import "../../styles/PostPage.css";
import axios from "../../axios";
import Comment from "../Comment";
import Post from "../Post";
import { useStateValue } from "../../stateprovider";
import SidebarAds from "../SidebarAds";

const PostPage = ({ match }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [{ user }] = useStateValue();
  const [updateCommentSection, setUpdateCommentSection] = useState(0);

  useEffect(() => {
    axios.get(`/posts/${match.params.id}`).then((res) => {
      setPost(res.data[0]);
      console.log(res.data[0]);
    });

    const header = { post_id: match.params.id };
    axios.get("/subreddit/post/comments", { headers: header }).then((res) => {
      setComments(res.data);
      console.log(comments);
    });
  }, [updateCommentSection]);

  const createComment = async () => {
    const newComment = {
      user_id: user.user_id,
      post_id: post.post_id,
      comment_content: commentInput,
      comment_upvotes: 0,
      comment_timestamp: new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(Date.now()),
    };
    console.log(newComment);
    await axios.post("/comments", newComment);
    setCommentInput("");
    let updates = updateCommentSection + 1;
    setUpdateCommentSection(updates);
  };

  return (
    <div>
      <SidebarAds />
      {comments ? (
        <div className="PostPage">
          {post && <Post post={post} />}
          <div className="PostPage_createComment">
            <textarea
              value={commentInput}
              placeholder="leave a comment..."
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <div className="PostPage_commentButton">
              {user ? (
                <button onClick={createComment}>Comment</button>
              ) : (
                <p style={{ margin: "2px" }}>must be logged in to comment</p>
              )}
            </div>
          </div>
          {comments.length > 0 && (
            <div className="PostPage_comments">
              {comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default PostPage;
