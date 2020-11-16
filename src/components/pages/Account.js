import React, { useState, useEffect } from "react";
import "../../styles/Account.css";
import axios from "../../axios";
import { useStateValue } from "../../stateprovider";

const Account = () => {
  const [posts, setPosts] = useState(null);
  const [{ user }] = useStateValue();

  useEffect(() => {
    const header = { user_id: user.user_id };
    axios.get(`/user/posts`, { headers: header }).then((res) => {
      setPosts(res.data);
      console.log(posts);
    });
  }, []);

  return <div>yo</div>;
};

export default Account;
