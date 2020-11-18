import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../styles/newPost.css";
import { useStateValue } from "../stateprovider";
import Select from "react-select";

function NewPost({ setCreatePostForm }) {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [{ user }] = useStateValue();
  const [value, setValue] = useState(null);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    axios.get("/subreddits").then((res) => setArr(res.data));
  }, []);

  const CreateNewPost = async (e) => {
    await axios.post("/posts", {
      subreddit_id: value.value,
      user_id: user.user_id,
      post_title: titleInput,
      post_content: descriptionInput,
      post_image: urlInput,
      post_upvotes: 100,
      post_timestamp: new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(Date.now()),
    });

    setTitleInput("");
    setDescriptionInput("");
    setUrlInput("");
  };

  let options = [];
  for (let i of arr) {
    options.push({
      value: i.subreddit_id,
      label: i.subreddit_title,
    });
  }

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
            setCreatePostForm(false);
            CreateNewPost();
          }}
          type="submit"
        >
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
