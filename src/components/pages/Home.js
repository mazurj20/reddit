import React from "react";
import "../../styles/Home.css";
import SubredditDisplay from "../SubredditDisplay";
import NewSubreddit from "../newSubreddit";
import NewPost from "../newPost"

const Home = ({ createSubredditForm, setCreateSubredditForm, createPostForm, setCreatePostForm }) => {

const ifTrue = () => {
    if (createSubredditForm) {
        return "subreddit"
        }
    else if (createPostForm) {
        return "post"
        } 
   

}

  return (
    <div className="Home">
        {(()=> {
            switch (ifTrue()) {
                case "subreddit": 
                    return <NewSubreddit setCreateSubredditForm={setCreateSubredditForm} />
                case "post": 
                    return <NewPost setCreatePostForm={setCreatePostForm} />
                default: 
                return (
                    <>
                        <SubredditDisplay />
                        <SubredditDisplay />
                        <SubredditDisplay />
                    </>
                )
            }
        })()}
      
      
    </div>
  );
};

export default Home;
