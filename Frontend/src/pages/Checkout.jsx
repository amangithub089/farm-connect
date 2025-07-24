import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || "");

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.pricePerUnit * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (!address) {
      toast.error("Delivery address is required");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      await axiosInstance.post("/api/orders", {
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount,
        deliveryAddress: address,
      });

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/thank-you");
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-20 px-6 min-h-screen bg-green-50 flex justify-center items-center">
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 px-6 min-h-screen bg-green-50">
      <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">Checkout</h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-green-800">Cart Summary</h2>

        {cart.map((item) => (
          <div key={item._id} className="mb-3 border-b pb-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <p className="text-xs text-gray-500">Seller: {item.farmer?.name}</p>
              </div>
              <p className="text-green-700 font-semibold">
                ₹ {(item.pricePerUnit * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-4 font-bold text-right text-green-800 text-lg">
          Total: ₹ {totalAmount.toFixed(2)}
        </div>

        <div className="mt-6">
          <label className="block mb-2 font-medium">Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={4}
            placeholder="Enter your delivery address"
          />
        </div>

        <button
          onClick={handleOrder}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold w-full"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
