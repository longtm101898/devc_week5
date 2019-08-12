import axios from "axios";

export const week5Api = axios.create({
  url: "https://newsapi.org/v2"
});
