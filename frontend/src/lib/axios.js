import axios from "axios";

// Dynamic base URL for dev/prod
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor: adds token before every request
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
