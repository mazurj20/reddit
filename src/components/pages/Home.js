import React, { useState, useEffect } from "react";
import "../../styles/Home.css";
import SubredditDisplay from "../SubredditDisplay";
import NewSubreddit from "../newSubreddit";
import NewPost from "../newPost";
import Post from "../Post";
import axios from "../../axios";

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
    <div>
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
                  <div className="posts__container">
                    {popularPosts.map((post) => (
                      <Post post={post} />
                    ))}
                  </div>
                )}
              </div>
            );
        }
      })()}
    </div>
  );
};

export default Home;
