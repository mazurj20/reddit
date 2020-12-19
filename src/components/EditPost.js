import React from "react";
import axios from "../axios";
import "../styles/EditPost.css";

function EditPost({
  profilePageUpdates,
  setProfilePageUpdates,
  setEditPost,
  titleInput,
  setTitleInput,
  descriptionInput,
  setDescriptionInput,
  urlInput,
  setUrlInput,
  id,
}) {
  const edit = async (e) => {
    await axios.put(`/post/${id}`, {
      post_title: titleInput,
      post_content: descriptionInput,
      post_image: urlInput,
    });

    setTitleInput("");
    setDescriptionInput("");
    setUrlInput("");
    let newUpdate = profilePageUpdates + 1;
    setProfilePageUpdates(newUpdate);
  };

  return (
    <div className="editPost__container">
      <div className="editPost__title">
        <textarea
          value={titleInput}
          placeholder="Post Title"
          onChange={(e) => setTitleInput(e.target.value)}
        />
      </div>
      <div className="editPost__description">
        <textarea
          value={descriptionInput}
          placeholder="Content"
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
      </div>
      <div className="editPost__url">
        <textarea
          value={urlInput}
          placeholder="Image URL(optional)"
          onChange={(e) => setUrlInput(e.target.value)}
        />
      </div>
      <div className="editPost__button">
        <button
          onClick={() => {
            setEditPost(false);
            edit();
          }}
          type="submit"
        >
          Submit
        </button>
        <button onClick={() => setEditPost(false)} type="submit">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditPost;
