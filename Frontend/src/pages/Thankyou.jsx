// src/pages/ThankYou.jsx
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  return (
    <div className="pt-20 min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="text-green-600 mb-4" size={64} />
      <h1 className="text-3xl font-bold text-green-800 mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-700 mb-6 max-w-md">
        Thank you for shopping with FarmConnect. Your order has been received and is now being processed.
      </p>
      <Link
        to="/products"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYou;
