import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const loginUser = (userData) => setUser(userData);

  const logoutUser = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
  };

  const loadUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
        withCredentials: true,
      });
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
