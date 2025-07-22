import Product from "../models/product.model.js";

const addProduct = async (req, res) => {
  try {
    const { title, description, pricePerUnit, quantity, unit, location } = req.body;

    if (!title || !pricePerUnit || !quantity) {
      return res.status(400).json({ message: "Title, price, and quantity are required" });
    }

    const product = new Product({
      title,
      description,
      pricePerUnit,
      quantity,
      unit,
      location,
      imageUrl: req.file?.path || "", // multer-cloudinary sets this automatically
      farmer: req.user._id,
    });


    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Add product error:", error.message);
    res.status(500).json({ message: "Server error while adding product" });
  }
};

const showProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("farmer", "name email") // show farmer's name & email
            .sort({ createdAt: -1 }); // latest first

        res.status(200).json(products);
    } catch (error) {
        console.error("Fetch products error:", error.message);
        res.status(500).json({ message: "Server error while fetching products" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Ensure the logged-in farmer owns the product
        if (product.farmer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this product" });
        }

        await product.deleteOne(); // or .remove()

        res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
        console.error("Delete product error:", error.message);
        res.status(500).json({ message: "Server error while deleting product" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.farmer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update" });
        }

        const updatedFields = {
            ...req.body,
            imageUrl: req.file?.path || product.imageUrl,
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Update product error:", error.message);
        res.status(500).json({ message: "Server error updating product" });
    }
}

const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({ farmer: req.user._id });
        if (!products) return res.status(400).json({ message: "No products" });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch your products" });
    }
};

export { addProduct, showProducts, deleteProduct, updateProduct, getMyProducts };