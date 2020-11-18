import React, { useState, useEffect } from "react";
import "../../styles/PostPage.css";
import axios from "../../axios";
import Comment from "../Comment";

const PostPage = ({ match }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axios.get(`/posts/${match.params.id}`).then((res) => {
      setPost(res.data);
      console.log(post);
    });

    const header = { post_id: match.params.id };
    axios.get("/subreddit/post/comments", { headers: header }).then((res) => {
      setComments(res.data);
      console.log(comments);
    });
  }, []);

  return (
    <div>
      {post && <h1>{post[0].post_title}</h1>}
      {comments ? (
        <div className="Subreddit_posts">
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
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
