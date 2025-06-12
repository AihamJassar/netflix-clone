import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoading: true,
  signup: async (credentials) => {
    try {
      set({ isSigningUp: true });
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message) || "Signup failed";
      set({ user: null, isSigningUp: false });
    }
  },
  login: async (credentials) => {
    try {
      set({ isLoggingIn: true });
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Login successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      set({ user: null, isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoading: false });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed");
      set({ isLoading: false });
    }
  },
  authCheck: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("/api/v1/auth/me");
      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
      console.error(error.response.data.message);
    }
  },
}));
