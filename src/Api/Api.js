import axios from "axios";

export const InfoUrl = "https://ipapi.co/json/";

export const publicApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/api`,
});
