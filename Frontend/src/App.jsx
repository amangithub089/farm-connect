import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import FarmerDashboard from "./pages/FarmerDashboard";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/Thankyou";
import FarmerOrders from "./pages/FarmerOrders"
import BuyerOrders from "./pages/BuyerOrders";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/farmer/dashboard"
            element={
              <ProtectedRoute role="Farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute role="Buyer">
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute role="Buyer">
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute role="Buyer">
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/thank-you"
            element={
              <ProtectedRoute role="Buyer">
                <ThankYou />
              </ProtectedRoute>
            }
          />

          <Route
            path="/farmer/orders"
            element={
              <ProtectedRoute role="Farmer">
                <FarmerOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/orders"
            element={
              <ProtectedRoute role="Buyer">
                <BuyerOrders />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
