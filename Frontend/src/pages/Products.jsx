import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Products = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showFarmerModal, setShowFarmerModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (error) {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="pt-20 px-4 sm:px-6 md:px-10 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-800 mb-10 text-center">Explore Fresh Farm Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No products available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md mb-4 text-sm">
                  No image available
                </div>
              )}

              <h2 className="text-xl font-semibold text-green-900 mb-1">{product.title}</h2>
              <p className="text-gray-700 text-sm mb-2 line-clamp-3">{product.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="font-bold text-green-700 text-lg">
                  Rate - ₹ {product.pricePerUnit} / {product.unit}
                </p>
                <button
                  className="text-green-700 hover:underline text-sm"
                  onClick={() => {
                    setSelectedFarmer(product.farmer);
                    setShowFarmerModal(true);
                  }}
                >
                  Seller - {product.farmer?.name}
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  toast.success("Added to cart");
                }}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-md font-medium"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Farmer Modal */}
      {showFarmerModal && selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowFarmerModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold text-green-800 mb-4">Farmer Details</h2>
            <p><span className="font-medium">Name:</span> {selectedFarmer.name}</p>
            <p><span className="font-medium">Email:</span> {selectedFarmer.email}</p>
            <p><span className="font-medium">Phone:</span> {selectedFarmer.phone}</p>
            <p><span className="font-medium">Address:</span> {selectedFarmer.address}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
