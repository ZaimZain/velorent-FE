import axios from "axios";
import config from "./config";

// Create a reusable axios instance
const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: handle token injection or response logging later
// api.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

export default api;
