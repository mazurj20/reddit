import React from "react";
import "../../styles/Home.css";
import SubredditDisplay from "../SubredditDisplay";
import NewSubreddit from "../newSubreddit";

const Home = ({ createSubredditForm, setCreateSubredditForm }) => {
  return (
    <div className="Home">
      {createSubredditForm ? (
        <NewSubreddit setCreateSubredditForm={setCreateSubredditForm} />
      ) : (
        <>
          <SubredditDisplay />
          <SubredditDisplay />
          <SubredditDisplay />
        </>
      )}
    </div>
  );
};

export default Home;
