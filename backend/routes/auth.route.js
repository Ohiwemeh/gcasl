import express from "express";
import {
  login,
  logout,
  signup,
  refreshToken,
  getProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// 📥 Register a new user
router.post("/signup", signup);

// 🔐 Login user and issue tokens
router.post("/login", login);

// 🚪 Logout and clear tokens
router.post("/logout", logout);

// ♻️ Refresh access token using refresh token
router.post("/refresh-token", refreshToken);

// 👤 Get authenticated user's profile
router.get("/profile", protectRoute, getProfile);

router.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Something went wrong" });
});


export default router;

  