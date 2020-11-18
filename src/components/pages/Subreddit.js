import React, { useState, useEffect } from "react";
import "../../styles/Subreddit.css";
import axios from "../../axios";
import Post from "../Post";

const Subreddit = ({ match }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const header = { subreddit_id: match.params.id };
    axios.get("/subreddit/posts", { headers: header }).then((res) => {
      setPosts(res.data);
      console.log(posts);
    });
  }, [match.params.id]);

  return (
    <div>
      {posts ? (
        <div className="Subreddit_posts">
          <h1>{`r/${posts[0].subreddit_title}`}</h1>
          {posts.map((post) => (
            <Post post={post} />
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

export default Subreddit;
