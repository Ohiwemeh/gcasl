import axios from "axios";

//VITE_API_BASE_URL should be: https://gcasl.onrender.com/api
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api", // ✅ Hardcoded for testing
//   withCredentials: true,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

console.log('🔍 Axios baseURL configured as:', import.meta.env.VITE_API_BASE_URL);

// Automatically refresh token if access token expired (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login")
    ) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post("/auth/refresh-token");
        return axiosInstance(originalRequest); // retry original request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
