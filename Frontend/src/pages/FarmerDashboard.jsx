import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; 

const FarmerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const initialForm = {
    title: "",
    description: "",
    pricePerUnit: "",
    quantity: "",
    unit: "",
    location: "",
    image: null,
  };

  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchMyProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/api/products/my");
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load your products");
      console.error("Fetch products error:", err);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setIsEditing(false);
    setEditProductId(null);
    setShowFormModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && !value) return;
      data.append(key, key === "pricePerUnit" || key === "quantity" ? Number(value) : value);
    });

    try {
      if (isEditing) {
        await axiosInstance.put(`/api/products/${editProductId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated!");
      } else {
        await axiosInstance.post("/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product added!");
      }

      resetForm();
      fetchMyProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving product");
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/products/${id}`);
      toast.success("Product removed");
      fetchMyProducts();
    } catch (err) {
      toast.error("Failed to delete");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-8 lg:px-16 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">
        Welcome, {user.name}
      </h1>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => {
            resetForm();
            setShowFormModal(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
        >
          + Add Product
        </button>
        <button
          onClick={() => navigate("/farmer/orders")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
        >
          View Orders
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-green-800 text-center">
        Your Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-lg font-bold text-green-900">{product.title}</h3>
            <p className="text-sm text-gray-700">{product.description}</p>
            <p className="text-sm font-semibold text-green-700">
              ₹{product.pricePerUnit} / {product.unit}
            </p>
            <p className="text-xs text-gray-500 mb-2">Location: {product.location}</p>

            <div className="mt-auto flex justify-end space-x-3 text-sm">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditProductId(product._id);
                  setForm({
                    title: product.title,
                    description: product.description,
                    pricePerUnit: product.pricePerUnit,
                    quantity: product.quantity,
                    unit: product.unit,
                    location: product.location,
                    image: null,
                  });
                  setShowFormModal(true);
                }}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg relative">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              {isEditing ? "Update Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Product Title"
                className="border px-4 py-2 rounded w-full"
                required
              />
              <input
                type="number"
                name="pricePerUnit"
                value={form.pricePerUnit}
                onChange={handleInputChange}
                placeholder="Price per Unit (₹)"
                className="border px-4 py-2 rounded w-full"
                required
              />
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                className="border px-4 py-2 rounded w-full"
                required
              />
              <input
                name="unit"
                value={form.unit}
                onChange={handleInputChange}
                placeholder="Unit (e.g. kg)"
                className="border px-4 py-2 rounded w-full"
              />
              <input
                name="location"
                value={form.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="border px-4 py-2 rounded w-full"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="Product Description"
                className="md:col-span-2 border px-4 py-2 rounded w-full"
                rows={3}
              />

              <div className="md:col-span-2 flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded font-medium"
                >
                  {isEditing ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-gray-600 underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
