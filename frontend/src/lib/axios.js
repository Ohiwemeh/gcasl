import axios from "axios";


const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    // ? "http://localhost:5000/api"
    // : "/api",,
  withCredentials: true,
  timeout: 10000, // optional: 10s timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// in lib/axios.js
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response?.status === 401 &&
      !error.config._retry &&
      error.config.url !== "/auth/login"
    ) {
      error.config._retry = true;
      await axiosInstance.post("/auth/refresh-token");
      return axiosInstance(error.config); // retry original request
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
