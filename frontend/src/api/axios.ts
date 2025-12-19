import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 10000,
});

// Add Authorization header if token exists
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
