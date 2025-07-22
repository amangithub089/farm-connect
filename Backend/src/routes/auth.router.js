// routes/auth.js
import express from "express";
import { registerUser, loginUser, logoutUser, getMyProfile } from "../controllers/auth.controller.js";
import { protectRoute, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/profile", protectRoute, getMyProfile);

// router.get("/farmer-dashboard", protectRoute, authorizeRoles("Farmer"), (req, res) => {
//   res.json({
//     message: `Welcome Farmer, ${req.user.name}`,
//     user: req.user,
//   });
// });
// router.get("/buyer-dashboard", protectRoute, authorizeRoles("Buyer"), (req, res) => {
//   res.json({
//     message: `Welcome Buyer, ${req.user.name}`,
//     user: req.user,
//   });
// });


export default router;
