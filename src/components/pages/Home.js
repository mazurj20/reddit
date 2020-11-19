import React, { useState, useEffect } from "react";
import "../../styles/Home.css";
import Sidebar from "../Sidebar";
import NewSubreddit from "../newSubreddit";
import NewPost from "../newPost";
import Post from "../Post";
import axios from "../../axios";
import { Button } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const Home = ({
  createSubredditForm,
  setCreateSubredditForm,
  createPostForm,
  setCreatePostForm,
  value,
  setValue,
}) => {
  const [popularPosts, setPopularPosts] = useState(null);
  const location = useLocation();
  if (location.state) {
    const id = location.state.id;
  }

  

  console.log(value)

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
              return <NewPost setValue={setValue} value={value} setCreatePostForm={setCreatePostForm} />;
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
