import React, { useState } from "react";
import axios from "../axios";
import "../styles/newSubreddit.css";
import { useStateValue } from "../stateprovider";


function NewSubreddit({ setCreateSubredditForm }) {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  

  const CreateNewSubreddit = async (e) => {
    await axios.post("/subreddits", {
      user_id: user.user_id,
      subreddit_title: titleInput,
      subreddit_content: descriptionInput,
      subreddit_url: urlInput,
    });

    setTitleInput("");
    setDescriptionInput("");
    setUrlInput("");
    
  };

  return (
    <div className="form__container">
      <div className="newSubreddit__title">
        <textarea
          value={titleInput}
          placeholder="Subreddit Title"
          onChange={(e) => setTitleInput(e.target.value)}
        />
      </div>
      <div className="newSubreddit__description">
        <textarea
          value={descriptionInput}
          placeholder="Description(optional)"
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
      </div>
      <div className="newSubreddit__url">
        <textarea
          value={urlInput}
          placeholder="Image URL(optional)"
          onChange={(e) => setUrlInput(e.target.value)}
        />
      </div>
      <div className="newSubreddit__button">
        <button 
        onClick={() => {
          
          setCreateSubredditForm(false) 
          CreateNewSubreddit()}} 
        type="submit">
          Create
        </button>
        <button onClick={() => setCreateSubredditForm(false)} type="submit">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NewSubreddit;
