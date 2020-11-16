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

function App() {
  const [createSubredditForm, setCreateSubredditForm] = useState(false);
  const [createPostForm, setCreatePostForm] = useState(false);
  const [{ user }] = useStateValue();

  return (
    <div className="App">
      <Navbar />
      <Sidebar
        setCreateSubredditForm={setCreateSubredditForm}
        setCreatePostForm={setCreatePostForm}
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
              />
            )}
          />
          <Route
            exact
            path="/account/:id"
            render={({ match }) => <Account match={match} />}
          />
          {user && <Route exact path="/profile" component={Profile} />}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
