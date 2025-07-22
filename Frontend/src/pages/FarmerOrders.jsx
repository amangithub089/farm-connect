import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const FarmerOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/farmer", {
        withCredentials: true,
      });
      setOrders(data);
    } catch {
      toast.error("Failed to load your orders");
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(
        `/api/orders/status/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(`Status updated to "${newStatus}"`);
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pt-20 px-4 sm:px-8 lg:px-16 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
        Orders Received
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No orders received yet.</p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-xl p-5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-800">
                    Buyer:{" "}
                    <button
                      onClick={() => setSelectedBuyer(order.buyer)}
                      className="text-green-700 hover:underline font-medium"
                    >
                      {order.buyer?.name}
                    </button>{" "}
                    ({order.buyer?.email})
                  </p>
                  <p className="text-xs text-gray-500">
                    Ordered on: {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="text-sm font-medium text-green-800">
                  Status:{" "}
                  <span className="capitalize text-gray-700">{order.status}</span>
                </div>
              </div>

              {order.products.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 border-t pt-3">
                  {item.product?.imageUrl && (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-green-900">
                      {item.product?.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} {item.product?.unit}
                    </p>
                    <p className="text-sm text-green-700 font-medium">
                      Unit Price: ₹{item.product?.pricePerUnit}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center mt-4">
                <div className="text-green-800 font-bold text-lg">
                  Total: ₹ {order.totalAmount.toFixed(2)}
                </div>

                {/* Status update buttons */}
                {order.status === "Pending" && (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(order._id, "Accepted")}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(order._id, "Rejected")}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {order.status === "Accepted" && (
                  <button
                    onClick={() => handleStatusUpdate(order._id, "Delivered")}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ────── Buyer Detail Modal ────── */}
      {selectedBuyer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-800">Buyer Details</h2>
            <p><span className="font-semibold">Name:</span> {selectedBuyer.name}</p>
            <p><span className="font-semibold">Email:</span> {selectedBuyer.email}</p>
            {selectedBuyer.phone && (
              <p><span className="font-semibold">Phone:</span> {selectedBuyer.phone}</p>
            )}
            {selectedBuyer.address && (
              <p><span className="font-semibold">Address:</span> {selectedBuyer.address}</p>
            )}

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedBuyer(null)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;
