import React, { useState, useEffect } from "react";
import "../../styles/PostPage.css";
import axios from "../../axios";
import Comment from "../Comment";
import Post from "../Post";
import { useStateValue } from "../../stateprovider";

const PostPage = ({ match }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [{ user }] = useStateValue();

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
  }, []);

  const createComment = async () => {
    const commentx = {
      user_id: user.user_id,
      post_id: post.post_id,
      comment_content: commentInput,
      comment_upvotes: 0,
      comment_timestamp: new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(Date.now()),
    };
    console.log(commentx);
    await axios.post("/comments", commentx);
    setCommentInput("");
  };

  return (
    <div>
      {comments ? (
        <div className="PostPage">
          {post && <Post post={post} />}
          {user ? (
            <div className="PostPage_createComment">
              <textarea
                placeholder="Content"
                value={commentInput}
                placeholder="Content"
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <div className="PostPage_commentButton">
                <button onClick={createComment}>Comment</button>
              </div>
            </div>
          ) : (
            <h1>login</h1>
          )}
          <div className="PostPage_comments">
            {comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </div>
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
