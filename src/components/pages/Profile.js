import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";
import axios from "../../axios";
import { useStateValue } from "../../stateprovider";
import Post from "../Post";
import SidebarAds from "../SidebarAds";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditPost from "../EditPost";

const Profile = () => {
  const [id, setId] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [editPost, setEditPost] = useState(false);
  const [posts, setPosts] = useState(null);
  const [account, setAccount] = useState(null);
  const [profilePageUpdates, setProfilePageUpdates] = useState(0);
  const [{ user }] = useStateValue();
  let fromProfilePage = true;

  useEffect(() => {
    const header = { user_id: user.user_id };
    axios.get(`/user/posts`, { headers: header }).then((res) => {
      setPosts(res.data);
    });
    axios.get(`/users/${user.user_id}`).then((res) => {
      setAccount(res.data[0]);
    });
  }, [profilePageUpdates]);

  const ifEdit = () => {
    if (editPost) {
      return "edit";
    } else if (!editPost && posts) {
      return "posts";
    }
  };

  console.log(posts);

  return (
    <div>
      {posts && (
        <SidebarAds top={"23.5%"} numOfAds={Math.ceil(posts.length / 2) + 1} />
      )}
      {user && (
        <div className="Profile_info">
          <div className="Profile_name">
            <AccountCircleIcon fontSize={"large"} style={{ padding: "3px" }} />
            <h4>{user.email}</h4>
          </div>
          {account && (
            <h4 style={{ padding: "3px" }}>{account.total_posts} posts</h4>
          )}
        </div>
      )}

      {(() => {
        switch (ifEdit()) {
          case "posts":
            return (
              <div className="Profile_posts">
                {posts.map((post) => (
                  <Post
                    profilePageUpdates={profilePageUpdates}
                    setProfilePageUpdates={setProfilePageUpdates}
                    fromProfilePage={fromProfilePage}
                    post={post}
                    editPost={editPost}
                    setEditPost={setEditPost}
                    setTitleInput={setTitleInput}
                    setDescriptionInput={setDescriptionInput}
                    setUrlInput={setUrlInput}
                    setId={setId}
                  />
                ))}
              </div>
            );
          case "edit":
            return (
              <EditPost
                id={id}
                titleInput={titleInput}
                setTitleInput={setTitleInput}
                descriptionInput={descriptionInput}
                setDescriptionInput={setDescriptionInput}
                urlInput={urlInput}
                setUrlInput={setUrlInput}
                setEditPost={setEditPost}
                editPost={editPost}
              />
            );
          default:
            return (
              <div>
                <h2>Loading...</h2>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default Profile;
