import { create } from "zustand";
// import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  // ✅ SIGNUP
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axiosInstance.post("/auth/signup", { name, email, password });
      set({ user: res.data });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ loading: false });
    }
  },


  // ✅ LOGIN
 login: async (email, password) => {
  set({ loading: true });
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    set({ user: res.data }); // Make sure this matches how your backend sends the user
    toast.success("Login successful");
    return true;
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    return false;
  } finally {
    set({ loading: false });
  }
},

   

  // ✅ LOGOUT
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  // ✅ CHECK SESSION
  checkAuth: async () => {
  set({ checkingAuth: true });
  try {
    const res = await axiosInstance.get("/auth/profile");
    set({ user: res.data });
    console.log("✅ Authenticated user:", res.data);
  } catch (err) {
    console.warn("🛑 Not authenticated:", err.response?.data?.message || err.message);
    set({ user: null });
  } finally {
    set({ checkingAuth: false });
  }
},

  // 🔄 REFRESH TOKEN (Optional - call it in Axios interceptor if you want)
  refreshToken: async () => {
    try {
      await axios.post("/auth/refresh-token");
      const res = await axiosInstance.get("/auth/profile");
      set({ user: res.data });
    } catch (error) {
      toast.error("Session expired, please login again");
      set({ user: null });
    }
  },
}));
export default useUserStore;