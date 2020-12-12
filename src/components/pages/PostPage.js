import React, { useState, useEffect } from "react";
import "../../styles/PostPage.css";
import axios from "../../axios";
import Comment from "../Comment";
import Post from "../Post";
import { useStateValue } from "../../stateprovider";
import SidebarAds from "../SidebarAds";
import moment from "moment";

const PostPage = ({ match }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [{ user }] = useStateValue();
  const [updateCommentSection, setUpdateCommentSection] = useState(0);

  useEffect(() => {
    axios.get(`/posts/${match.params.id}`).then((res) => {
      setPost(res.data[0]);
    });

    const header = { post_id: match.params.id };
    axios.get("/subreddit/post/comments", { headers: header }).then((res) => {
      setComments(res.data);
    });
  }, [updateCommentSection]);

  const createComment = async () => {
    const newComment = {
      user_id: user.user_id,
      post_id: post.post_id,
      comment_content: commentInput,
      comment_upvotes: 0,
      comment_timestamp: moment().format("YYYY-MM-DDTHH:mm"),
    };
    console.log(newComment);
    await axios.post("/comments", newComment);
    setCommentInput("");
    let updates = updateCommentSection + 1;
    setUpdateCommentSection(updates);
  };

  return (
    <div>
      {comments ? (
        <>
          <SidebarAds
            top={"12%"}
            numOfAds={Math.floor(comments.length / 2) - 1}
          />

          <div className="PostPage">
            {post && <Post post={post} />}
            <div className="PostPage_createComment">
              <textarea
                value={commentInput}
                placeholder="join the conversation..."
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
                  <Comment
                    comment={comment}
                    updateCommentSection={updateCommentSection}
                    setUpdateCommentSection={setUpdateCommentSection}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default PostPage;
