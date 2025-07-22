import express from "express";
import multer from "multer";
import { addProduct, showProducts, deleteProduct, updateProduct, getMyProducts } from "../controllers/product.controller.js";
import { protectRoute, authorizeRoles } from "../middlewares/auth.middleware.js"

import { storage } from "../lib/cloudinary.js";
const upload = multer({ storage });

const router = express.Router();

router.post('/', protectRoute, authorizeRoles("Farmer"), upload.single("image"), addProduct);
router.get('/', showProducts);
router.delete('/:id', protectRoute, authorizeRoles("Farmer"), deleteProduct);
router.put('/:id', protectRoute, authorizeRoles("Farmer"), upload.single("image"), updateProduct);
router.get('/my', protectRoute, authorizeRoles("Farmer"), getMyProducts);


export default router;