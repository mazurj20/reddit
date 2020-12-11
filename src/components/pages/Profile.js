import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";
import axios from "../../axios";
import { useStateValue } from "../../stateprovider";
import Post from "../Post";
import SidebarAds from "../SidebarAds";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Profile = () => {
  const [posts, setPosts] = useState(null);
  const [account, setAccount] = useState(null);
  const [{ user }] = useStateValue();

  useEffect(() => {
    const header = { user_id: user.user_id };
    axios.get(`/user/posts`, { headers: header }).then((res) => {
      setPosts(res.data);
    });
    axios.get(`/users/${user.user_id}`).then((res) => {
      setAccount(res.data[0]);
    });
  }, []);

  return (
    <div>
      {posts && (
        <SidebarAds top={"17.5%"} numOfAds={Math.ceil(posts.length / 2) + 1} />
      )}
      {user && (
        <div className="Profile_info">
          <div className="Profile_name">
            <AccountCircleIcon style={{ padding: "5px" }} />
            <h3>{user.email}</h3>
          </div>
          {account && (
            <h3 style={{ padding: "5px" }}>{account.total_posts} posts</h3>
          )}
        </div>
      )}
      {posts && (
        <div className="Profile_posts">
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      )}
      {posts && console.log(posts)}
    </div>
  );
};

export default Profile;
