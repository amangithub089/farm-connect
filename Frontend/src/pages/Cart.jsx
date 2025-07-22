import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
  console.log(cart);

  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.pricePerUnit * item.quantity,
    0
  );

  return (
    <div className="pt-20 px-4 sm:px-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-10 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg">Your cart is currently empty.</p>
          <Link
            to="/products"
            className="mt-4 inline-block text-green-700 hover:underline text-base font-medium"
          >
            Continue Shopping →
          </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-green-900">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-green-700 font-bold mt-1">₹ {(item.pricePerUnit * item.quantity).toFixed(2)}</p>

                <div className="flex items-center mt-3 space-x-2">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
            <div className="text-xl font-bold text-green-800">
              Total: ₹ {totalAmount.toFixed(2)}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/products")}
                className="bg-gray-200 hover:bg-gray-300 text-green-800 px-6 py-2 rounded-lg font-semibold"
              >
                Add More Products
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
