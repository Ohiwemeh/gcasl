import axios from "axios";

// Mobile-optimized axios configuration
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 30000, // Increased to 30 seconds for mobile
  headers: {
    "Content-Type": "application/json",
  },
});

// Debug logging for mobile
if (import.meta.env.MODE === "development") {
  console.log("🔍 Environment Check:");
  console.log("- Base URL:", import.meta.env.VITE_API_BASE_URL);
  console.log("- User Agent:", navigator.userAgent);
  console.log("- Is Mobile:", /Android|webOS|iPhone|.../.test(navigator.userAgent));
  console.log("- Screen Width:", window.innerWidth);
  console.log("- Connection:", navigator.connection?.effectiveType || "unknown");
}

// Request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    if (import.meta.env.MODE === "development") {
      console.log("📤 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        fullURL: config.baseURL + config.url,
        timeout: config.timeout,
      });
    }
    return config;
  },
  (error) => {
    if (import.meta.env.MODE === "development") {
      console.error("📤 Request Error:", error);
    }
    return Promise.reject(error);
  }
);


// Response interceptor with better mobile error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', {
      status: response.status,
      url: response.config.url,
      dataSize: JSON.stringify(response.data).length
    });
    return response;
  },
  async (error) => {
    console.error('📥 API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: error.message,
      code: error.code,
      isTimeout: error.code === 'ECONNABORTED',
      isNetworkError: error.message === 'Network Error'
    });

    const originalRequest = error.config;

    // Handle timeout errors on mobile
    if (error.code === 'ECONNABORTED') {
      console.warn('⏱️ Request timed out - this might be a mobile connection issue');
      return Promise.reject(new Error('Request timed out. Please check your connection and try again.'));
    }

    // Handle network errors on mobile
    if (error.message === 'Network Error') {
      console.warn('🌐 Network error - mobile connection might be unstable');
      return Promise.reject(new Error('Network connection error. Please check your internet and try again.'));
    }

    // Token refresh logic
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login")
    ) {
      originalRequest._retry = true;
      try {
        console.log('🔄 Attempting token refresh...');
        await axiosInstance.post("/auth/refresh-token");
        console.log('✅ Token refreshed successfully');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;