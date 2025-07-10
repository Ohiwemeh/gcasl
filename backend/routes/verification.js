import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import {
  submitVerification,
  updateVerificationStatus,
  getAllVerifications,
} from "../controllers/verificationController.js";

const router = express.Router();

// ✅ POST: Submit verification (now expects frontId and backId URLs from frontend)
router.post("/", protectRoute, submitVerification);

// ✅ GET: Get all verifications (admin only)
router.get("/", protectRoute, adminRoute, getAllVerifications);

// ✅ PATCH: Approve or decline a specific verification (admin only)
router.patch("/:id", protectRoute, adminRoute, updateVerificationStatus);

export default router;
