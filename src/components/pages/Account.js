import React, { useState, useEffect } from "react";
import "../../styles/Account.css";
import axios from "../../axios";
import Post from "../Post";

const Account = ({ match }) => {
  const [posts, setPosts] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const header = { user_id: match.params.id };
    console.log(match.params.id);
    axios.get(`/user/posts`, { headers: header }).then((res) => {
      setPosts(res.data);
    });
    axios.get(`/users/${match.params.id}`).then((res) => {
      setAccount(res.data[0]);
    });
  }, []);

  return (
    <div>
      {account && <h1>{account.email}</h1>}
      {posts ? (
        <div className="posts__container">
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
      {posts && console.log(posts)}
    </div>
  );
};

export default Account;
