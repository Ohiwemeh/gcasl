import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// 🛡 Protect routes with access token
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

   
if (!accessToken) {
  console.log("🛑 No access token in cookies:", req.cookies);
  return res.status(401).json({ message: "Unauthorized - No access token provided" });
}

    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized - Access token expired" });
      }
      return res.status(401).json({ message: "Unauthorized - Invalid access token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ protectRoute error:", error.message);
    res.status(500).json({ message: "Server error in authentication middleware" });
  }
};

// middleware/auth.middleware.js
export const adminRoute = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    console.warn(`Unauthorized admin access attempt by ${req.user?._id}`);
    return res.status(403).json({
      success: false,
      message: 'Admin privileges required'
    });
  }
  next();
};
