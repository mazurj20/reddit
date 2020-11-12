import axios from "axios";

const instance = axios.create({
  baseURL: "https://redditv2.herokuapp.com/",
});

export default instance;
