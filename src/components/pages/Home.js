import React, { useState, useEffect } from "react";
import "../../styles/Home.css";
import Sidebar from "../Sidebar";
import NewSubreddit from "../newSubreddit";
import NewPost from "../newPost";
import Post from "../Post";
import axios from "../../axios";
import { Button } from "@material-ui/core";

const Home = ({
  createSubredditForm,
  setCreateSubredditForm,
  createPostForm,
  setCreatePostForm,
}) => {
  const [popularPosts, setPopularPosts] = useState(null);

  useEffect(() => {
    axios.get(`/popular`).then((res) => {
      setPopularPosts(res.data);
    });
  }, []);

  const ifTrue = () => {
    if (createSubredditForm) {
      return "subreddit";
    } else if (createPostForm) {
      return "post";
    }
  };

  return (
    <>
      <Sidebar
        className="Sidebar"
        setCreateSubredditForm={setCreateSubredditForm}
        setCreatePostForm={setCreatePostForm}
      />
      <div className="Home">
        {(() => {
          switch (ifTrue()) {
            case "subreddit":
              return (
                <NewSubreddit setCreateSubredditForm={setCreateSubredditForm} />
              );
            case "post":
              return <NewPost setCreatePostForm={setCreatePostForm} />;
            default:
              return (
                <div>
                  {popularPosts && (
                    <>
                      <div className="Post_button">
                        <Button onClick={() => setCreatePostForm(true)}>
                          Create a post
                        </Button>
                      </div>
                      <div className="Home_posts">
                        {popularPosts.map((post) => (
                          <Post post={post} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
          }
        })()}
      </div>
    </>
  );
};

export default Home;
