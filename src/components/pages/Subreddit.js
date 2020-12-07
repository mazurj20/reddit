import React, { useState, useEffect } from "react";
import "../../styles/Subreddit.css";
import axios from "../../axios";
import Post from "../Post";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SidebarAds2 from "../SidebarAds2";
import { useStateValue } from "../../stateprovider";

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
  const [{ user }] = useStateValue();

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
    if (user) {
      setValue(match.params.id);
      setId(match.params.id);
      setCreatePostForm(true);
      setFromHome(false);
      history.push({
        pathname: "/",
        state: { id: [match.params.id] },
      });
    } else {
      alert("login");
    }
  };

  return (
    <>
      <div className="Subreddit">
        <SidebarAds2 />
        {posts && subreddit ? (
          <>
            <div className="Subreddit_image">
              {subreddit[0].subreddit_image && (
                <img src={subreddit[0].subreddit_image}></img>
              )}
            </div>
            <div className="Subreddit_header">
              <div className="Subreddit_header_background"></div>
              <h1>{`r/${subreddit[0].subreddit_title}`}</h1>
              <p>{subreddit[0].subreddit_content}</p>
              <h3>{`${subreddit[0].members}`} members in this community</h3>
            </div>
            <div className="Subreddit_posts">
              <div className="Subreddit_post_button">
                <Button onClick={createPost}>Create a post</Button>
              </div>
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
    </>
  );
};

export default Subreddit;
