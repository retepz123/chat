import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-me-qf7o.onrender.com/api", // your backend
  withCredentials: true, // important: sends cookies cross-site
});
