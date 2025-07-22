import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    // redirect unauthorized roles
    return <Navigate to={user.role === "Farmer" ? "/farmer/dashboard" : "/products"} />;
  }

  return children;
};

export default ProtectedRoute;
