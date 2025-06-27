import axios from "axios";

// ✅ Detect environment
const isDev = import.meta.env.MODE === "development";

// ✅ Base URL: use proxy in dev, full HTTPS backend URL in production
const BASE_URL = isDev
  ? "/api"
  : "https://notevader-backend.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
