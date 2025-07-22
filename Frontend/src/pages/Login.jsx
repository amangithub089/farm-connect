import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("Please enter both email and password");
    }

    try {
      const res = await axios.post("/api/auth/login", form, {
        withCredentials: true,
      });

      toast.success("Login successful!");
      loginUser(res.data);

      if (res.data.role === "Farmer") navigate("/farmer/dashboard");
      else navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-green-200 transition-all hover:shadow-green-200">
        <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">Welcome Back</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="example@farmconnect.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-5 text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-700 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
