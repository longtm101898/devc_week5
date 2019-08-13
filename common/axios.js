import axios from "axios";

export const week5Api = axios.create({
  baseURL: "https://newsapi.org/v2"
});
