import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
console.log(backend);
const api = axios.create({
  baseURL: backend,
   withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
