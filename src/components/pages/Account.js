import React, { useState, useEffect } from "react";
import "../../styles/Account.css";
import axios from "../../axios";
import Post from "../Post";
import SidebarAds from "../SidebarAds";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditPost from "../EditPost";

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
      {posts && (
        <SidebarAds top={"23.5%"} numOfAds={Math.ceil(posts.length / 2) + 1} />
      )}
      {account && (
        <div className="Account_info">
          <div className="Account_name">
            <AccountCircleIcon fontSize={"large"} style={{ padding: "3px" }} />
            <h4>{account.email}</h4>
          </div>
          <h4 style={{ padding: "3px" }}>{account.total_posts} posts</h4>
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
