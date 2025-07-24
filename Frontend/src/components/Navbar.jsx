import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, LogOut, ListOrdered } from "lucide-react";
import logo from "../assets/logo.svg"; 

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-0 bg-gradient-to-r from-lime-200 to-green-500 text-white shadow-md backdrop-blur-md">
      
      {/* Logo only (no text) */}
      <Link to="/">
        <img
          src={logo}
          alt="FarmConnect Logo"
          className="h-20 w-auto object-contain"
        />
      </Link>

      {/* Right section */}
      <div className="flex items-center gap-6 text-sm font-medium">
        {user ? (
          <>
            {/* Buyer-specific links */}
            {user.role === "Buyer" && (
              <>
                <Link
                  to="/cart"
                  className="flex items-center gap-1 text-white hover:text-lime-300 transition"
                >
                  <ShoppingCart size={20} />
                  <span className="hidden sm:inline">Cart</span>
                </Link>

                <Link
                  to="/buyer/orders"
                  className="flex items-center gap-1 text-white hover:text-lime-300 transition"
                >
                  <ListOrdered size={20} />
                  <span className="hidden sm:inline">My Orders</span>
                </Link>
              </>
            )}

            {/* Username + Logout */}
            <div className="flex items-center gap-2">
              <span className="bg-lime-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-lime-300 transition duration-200 border-b-2 border-transparent hover:border-lime-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-lime-300 transition duration-200 border-b-2 border-transparent hover:border-lime-300"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
