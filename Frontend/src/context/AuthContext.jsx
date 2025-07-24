import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // centralized instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUser = (userData) => setUser(userData);

  const logoutUser = async () => {
    try {
      await axiosInstance.post("api/auth/logout"); // no baseURL or withCredentials needed
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
  };

  const loadUser = async () => {
    try {
      const res = await axiosInstance.get("api/auth/profile"); // uses central config
      setUser(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("Guest user detected — no auth token found.");
      } else {
        console.error("Error loading user profile:", error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
