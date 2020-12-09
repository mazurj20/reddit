import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";
import axios from "../../axios";
import { useStateValue } from "../../stateprovider";
import Post from "../Post";
import SidebarAds1 from "../SidebarAds1";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Profile = () => {
  const [posts, setPosts] = useState(null);
  const [{ user }] = useStateValue();

  useEffect(() => {
    const header = { user_id: user.user_id };
    axios.get(`/user/posts`, { headers: header }).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <SidebarAds1 />
      {user && (
        <div className="Profile_info">
          <div className="Profile_name">
            <AccountCircleIcon style={{ padding: "5px" }} />
            <h1>{user.email}</h1>
          </div>
          <h1 style={{ padding: "5px" }}>{user.total_posts} posts</h1>
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
