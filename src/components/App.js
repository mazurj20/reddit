import React, { useState } from "react";
import "../styles/App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "./pages/Home";
import { Switch, Route } from "react-router-dom";

function App() {
  const [createSubredditForm, setCreateSubredditForm] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <Sidebar setCreateSubredditForm={setCreateSubredditForm} />
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                createSubredditForm={createSubredditForm}
                setCreateSubredditForm={setCreateSubredditForm}
              />
            )}
          />
          <Route exact path="/r/" component={Navbar} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
