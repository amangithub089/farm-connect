import { Link } from "react-router-dom";
import { FaTractor, FaLock, FaTruck } from "react-icons/fa"; // Using react-icons for consistency
import bg from "../assets/bg.png"
const Home = () => {
  return (
    <div className="pt-16 bg-green-50 min-h-screen">

      {/* Hero Section */}
      <div
        className="h-[80vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white relative"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 text-center px-4 max-w-2xl animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connecting Farms to Homes</h1>
          <p className="text-lg md:text-xl mb-6">
            Empowering farmers. Delivering freshness. Building trust.
          </p>
          <Link
            to="/products"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg font-semibold transition duration-300"
          >
            Explore Products
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-20 bg-white text-center px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 mb-12">Why Choose FarmConnect?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="shadow p-6 rounded hover:shadow-lg transition bg-green-50 hover:scale-105 transform">
            <FaTractor className="text-5xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Direct from Farmers</h3>
            <p className="text-gray-600 text-sm">
              Eliminate middlemen and support local farmers with fair prices.
            </p>
          </div>

          <div className="shadow p-6 rounded hover:shadow-lg transition bg-green-50 hover:scale-105 transform">
            <FaLock className="text-5xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Transparent</h3>
            <p className="text-gray-600 text-sm">
              Safe transactions with verified profiles and trusted feedback.
            </p>
          </div>

          <div className="shadow p-6 rounded hover:shadow-lg transition bg-green-50 hover:scale-105 transform">
            <FaTruck className="text-5xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Timely delivery from the field to your doorstep with care.
            </p>
          </div>
        </div>
      </section>

      {/* Mid Page CTA */}
      <section className="bg-green-700 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Support Farmers, Get Freshness</h2>
        <p className="mb-6">Join the movement for direct farm-to-home connections.</p>
        <Link
          to="/products"
          className="bg-white text-green-700 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-lime-900 text-white text-center py-6 text-sm">
        <p>© {new Date().getFullYear()} FarmConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
