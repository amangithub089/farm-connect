import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/buyer");
      setOrders(data);
    } catch (err) {
      toast.error("Failed to fetch your orders");
      console.error("❌ Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pt-20 px-4 sm:px-8 lg:px-16 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No orders placed yet.
        </p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-xl p-5">
              <h2 className="text-lg font-semibold text-green-900 mb-2">
                Order ID: {order._id}
              </h2>

              {order.products.map(({ product, quantity }, index) => (
                <div
                  key={index}
                  className="border-b py-2 flex gap-4 items-center"
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-green-800">
                      {product.title}
                    </h3>
                    <p className="text-sm">Qty: {quantity}</p>
                    <p className="text-sm text-green-700">
                      ₹ {(product.pricePerUnit * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-3 text-sm text-gray-700">
                <p>
                  Seller:{" "}
                  <button
                    onClick={() => setSelectedFarmer(order.farmer)}
                    className="text-green-700 underline"
                  >
                    {order.farmer?.name}
                  </button>
                </p>
                <p>Delivery Address: {order.deliveryAddress}</p>
                <p>
                  Status:{" "}
                  <span className="font-medium">{order.status}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ────── Farmer Detail Dialog ────── */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setSelectedFarmer(null)}
              className="absolute top-2 right-4 text-xl text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Farmer Details
            </h2>
            <p>
              <strong>Name:</strong> {selectedFarmer.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedFarmer.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedFarmer.phone}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerOrders;
