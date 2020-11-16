import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";
import axios from "../../axios";
import { useStateValue } from "../../stateprovider";
import Post from "../Post";

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
      {posts && (
        <div className="posts__container">
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
