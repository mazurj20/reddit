import React, { useState, useEffect } from "react";
import "../../styles/Subreddit.css";
import axios from "../../axios";
import Post from "../Post";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Subreddit = ({
  match,
  setCreatePostForm,
  value,
  setValue,
  setFromHome,
}) => {
  const [posts, setPosts] = useState(null);
  const [id, setId] = useState(null);
  const [subreddit, setSubreddit] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const header = { subreddit_id: match.params.id };
    axios.get("/subreddit/posts", { headers: header }).then((res) => {
      setPosts(res.data);
      console.log(posts);
    });
    axios
      .get(`/subreddits/${match.params.id}`)
      .then((res) => setSubreddit(res.data));
  }, [match.params.id]);

  console.log(subreddit);

  const createPost = () => {
    setValue(match.params.id);
    setId(match.params.id);
    setCreatePostForm(true);
    setFromHome(false);
    history.push({
      pathname: "/",
      state: { id: [match.params.id] },
    });
  };

  return (
    <div className="Subreddit">
      {posts ? (
        <>
          <div className="Subreddit_image">
            {subreddit[0].subreddit_image && (
              <img src={subreddit[0].subreddit_image}></img>
            )}
          </div>
          <div className="Subreddit_header">header</div>

          <Button onClick={createPost}>Create a post</Button>
          <div className="Subreddit_posts">
            <h1>{`r/${posts[0].subreddit_title}`}</h1>
            {posts.map((post) => (
              <Post post={post} />
            ))}
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

export default Subreddit;
