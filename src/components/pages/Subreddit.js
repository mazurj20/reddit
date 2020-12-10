import React, { useState, useEffect } from "react";
import "../../styles/Subreddit.css";
import axios from "../../axios";
import Post from "../Post";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SidebarAds from "../SidebarAds";
import { useStateValue } from "../../stateprovider";
import PeopleIcon from "@material-ui/icons/People";

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
        {posts && subreddit ? (
          <>
            <SidebarAds
              className="Subreddit_sidebar"
              top={"43%"}
              numOfAds={Math.ceil(posts.length / 2) + 1}
            />
            <div className="Subreddit_image">
              {subreddit[0].subreddit_image && (
                <img src={subreddit[0].subreddit_image}></img>
              )}
            </div>
            <div className="Subreddit_header">
              <div className="Subreddit_header_background"></div>
              <div className="Subreddit_header_info">
                <div>
                  <h1 className="Subreddit_header_title">{`r/${subreddit[0].subreddit_title}`}</h1>
                  <h3>Description: {subreddit[0].subreddit_content}</h3>
                </div>
                <div className="Subreddit_header_users">
                  <PeopleIcon style={{ marginRight: "10px" }} />
                  <h3>{`${subreddit[0].members}`} user(s) in this community</h3>
                </div>
              </div>
            </div>
            <div className="Subreddit_posts">
              <div className="Subreddit_post_button">
                <Button style={{ fontSize: "10px" }} onClick={createPost}>
                  Create a post
                </Button>
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
