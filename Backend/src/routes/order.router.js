import express from "express";
import {protectRoute, authorizeRoles} from "../middlewares/auth.middleware.js"
import { placeOrder, OrderPlacedByBuyer, OrderReceivedByFarmer, updateOrderStatus } from "../controllers/order.controller.js"

const router = express.Router();

router.post('/', protectRoute, authorizeRoles("Buyer"), placeOrder);
router.put('/status/:id', protectRoute, authorizeRoles("Farmer"), updateOrderStatus);
router.get('/buyer', protectRoute, authorizeRoles("Buyer"), OrderPlacedByBuyer);
router.get('/farmer', protectRoute, authorizeRoles("Farmer"), OrderReceivedByFarmer);

export default router;