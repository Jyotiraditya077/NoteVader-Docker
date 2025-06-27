import axios from "axios";

// ✅ Detect environment
const isDev = import.meta.env.MODE === "development";

// ✅ Use proxy in dev, Docker container hostname in prod
const BASE_URL = isDev ? "/api" : "http://notevader-backend:5001/api";

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
