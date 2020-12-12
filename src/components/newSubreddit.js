import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../styles/newSubreddit.css";
import { useStateValue } from "../stateprovider";

function NewSubreddit({ setCreateSubredditForm, pageUpdates, setPageUpdates }) {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [arr, setArr] = useState([]);
  const [duplicate, setDuplicate] = useState("none");

  useEffect(() => {
    axios.get("/subreddits").then((res) => setArr(res.data));
  }, []);

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

    let newUpdate = pageUpdates + 1;
    setPageUpdates(newUpdate);
  };

  arr.map((sub) => {
    console.log(sub.subreddit_title);
    if (duplicate === "none") {
      if (sub.subreddit_title.toLowerCase() === titleInput.toLowerCase()) {
        setDuplicate("block");
      }
    } else {
      if (sub.subreddit_title.toLowerCase() !== titleInput.toLowerCase()) {
        setDuplicate("none");
      }
    }
  });

  return (
    <div className="form__container">
      <div className="newSubreddit__title">
        <textarea
          value={titleInput}
          placeholder="Subreddit Title"
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <p style={{ display: duplicate }}>Subreddit already exists</p>
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
            if (duplicate === "none") {
              setCreateSubredditForm(false);
              CreateNewSubreddit();
            }
          }}
          type="submit"
        >
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
