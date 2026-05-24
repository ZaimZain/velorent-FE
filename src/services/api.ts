import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 8000,
  withCredentials: true, // IMPORTANT: send/receive JSESSIONID cookie
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;