import React from "react";
import "../../styles/Home.css";
import SubredditDisplay from "../SubredditDisplay";

const Home = () => {
  return (
    <div className="Home">
      <SubredditDisplay />
      <SubredditDisplay />
      <SubredditDisplay />
    </div>
  );
};

export default Home;
