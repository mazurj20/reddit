import React, { useState } from "react";
import "../styles/App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "./pages/Home";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import { useStateValue } from "../stateprovider";
import Subreddit from "./pages/Subreddit";
import PostPage from "./pages/PostPage";

function App() {
  const [createSubredditForm, setCreateSubredditForm] = useState(false);
  const [createPostForm, setCreatePostForm] = useState(false);
  const [value, setValue] = useState(null);
  const [fromHome, setFromHome] = useState(true);
  const [{ user }] = useStateValue();

  return (
    <div className="App">
      <Navbar
        setCreatePostForm={setCreatePostForm}
        setCreateSubredditForm={setCreateSubredditForm}
      />

      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                createSubredditForm={createSubredditForm}
                setCreateSubredditForm={setCreateSubredditForm}
                createPostForm={createPostForm}
                setCreatePostForm={setCreatePostForm}
                value={value}
                setValue={setValue}
                fromHome={fromHome}
                setFromHome={setFromHome}
              />
            )}
          />
          <Route
            exact
            path="/account/:id"
            render={({ match }) => <Account match={match} />}
          />
          <Route
            exact
            path="/subreddits/:id"
            render={({ match }) => (
              <Subreddit
                match={match}
                setCreatePostForm={setCreatePostForm}
                value={value}
                setValue={setValue}
                setFromHome={setFromHome}
              />
            )}
          />
          <Route
            exact
            path="/posts/:id"
            render={({ match }) => <PostPage match={match} />}
          />
          {user && <Route exact path="/profile" component={Profile} />}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;

