import React, { useState, useEffect } from "react";
import "../../styles/Account.css";
import axios from "../../axios";
import { useStateValue } from "../../stateprovider";

const Account = () => {
  const [posts, setPosts] = useState(null);
  const [{ user }] = useStateValue();

  useEffect(() => {
    axios.get(`/user/posts`, { user_id: user.user_id }).then((res) => {
      setPosts(res.data);
      console.log(user.user_id);
      console.log(res.data);
      console.log(posts);
    });
  }, []);

  return <div>yo</div>;
};

export default Account;
