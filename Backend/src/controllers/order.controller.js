import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

const placeOrder = async (req, res) => {
  try {
    const { products, totalAmount, deliveryAddress } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products are required" });
    }

    if (!deliveryAddress || !totalAmount) {
      return res.status(400).json({ message: "Address and total amount are required" });
    }

    // Group orders by farmer
    const farmerOrders = {};

    for (const item of products) {
      const product = await Product.findById(item.product).populate("farmer");
      if (!product) return res.status(404).json({ message: "Product not found" });

      const farmerId = product.farmer._id.toString();

      if (!farmerOrders[farmerId]) {
        farmerOrders[farmerId] = {
          buyer: req.user._id,
          farmer: farmerId,
          products: [],
          totalAmount: 0,
          deliveryAddress,
        };
      }

      farmerOrders[farmerId].products.push({
        product: product._id,
        quantity: item.quantity,
      });

      farmerOrders[farmerId].totalAmount += product.pricePerUnit * item.quantity;
    }

    // Save separate order per farmer
    const savedOrders = await Promise.all(
      Object.values(farmerOrders).map(async (orderData) => {
        const order = new Order(orderData);
        return await order.save();
      })
    );

    res.status(201).json({ message: "Orders placed", orders: savedOrders });
  } catch (error) {
    console.error("Place order error:", error.message);
    res.status(500).json({ message: "Server error placing order" });
  }
};

const OrderPlacedByBuyer = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products.product", "title pricePerUnit imageUrl")
      .populate("farmer", "name email");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Buyer orders error:", error.message);
    res.status(500).json({ message: "Error fetching buyer orders" });
  }
};

const OrderReceivedByFarmer = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id })
      .populate("products.product", "title pricePerUnit imageUrl unit")
      .populate("buyer", "name email phone address"); // include full buyer details

    res.status(200).json(orders);
  } catch (error) {
    console.error("Farmer orders error:", error.message);
    res.status(500).json({ message: "Error fetching farmer orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Accepted", "Rejected", "Delivered"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findOne({ _id: id, farmer: req.user._id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Update order status error:", error.message);
    res.status(500).json({ message: "Server error updating status" });
  }
};



export { placeOrder, OrderPlacedByBuyer, OrderReceivedByFarmer, updateOrderStatus };
