import React, { useState, useEffect } from "react";
import "../../styles/Account.css";
import axios from "../../axios";
import Post from "../Post";
import SidebarAds1 from "../SidebarAds1";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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
      <SidebarAds1 />
      {account && (
        <div className="Account_info">
          <div className="Account_name">
            <AccountCircleIcon style={{ padding: "5px" }} />
            <h1>{account.email}</h1>
          </div>
          <h1 style={{ padding: "5px" }}>{account.total_posts} posts</h1>
        </div>
      )}
      {posts ? (
        <div className="Account_posts">
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
