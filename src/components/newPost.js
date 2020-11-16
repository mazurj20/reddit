import React, { useState } from "react";
import axios from "../axios";
import "../styles/newPost.css";
import { useStateValue } from "../stateprovider";
import Select from "react-select";


function NewPost({ setCreatePostForm}) {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState(null);

  const CreateNewPost = async (e) => {
    await axios.post("/posts", {
      
      user_id: user.user_id,
      post_title: titleInput,
      post_content: descriptionInput,
      post_image_url: urlInput,
      post_upvotes: 0,
      post_timestamp: new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(Date.now()),
    });

    setTitleInput("");
    setDescriptionInput("");
    setUrlInput("");
    
  };

  let options = [1,2,3]

  return (
    <div className="form__container">
        <Select
            defaultValue={"subreddit"}
            onChange={setValue}
            options={options}
            placeholder={"subreddit"}
            />
      <div className="newPost__title">
        <textarea
          value={titleInput}
          placeholder="Post Title"
          onChange={(e) => setTitleInput(e.target.value)}
        />
      </div>
      <div className="newPost__description">
        <textarea
          value={descriptionInput}
          placeholder="Content"
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
      </div>
      <div className="newPost__url">
        <textarea
          value={urlInput}
          placeholder="Image URL(optional)"
          onChange={(e) => setUrlInput(e.target.value)}
        />
      </div>
      <div className="newPost__button">
        <button 
        onClick={() => {
          setCreatePostForm(false) 
          CreateNewPost()}} 
        type="submit">
          Create
        </button>
        <button onClick={() => setCreatePostForm(false)} type="submit">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NewPost;