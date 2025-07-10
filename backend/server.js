// server.js (final unified version)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import verificationRoutes from "./routes/verification.js"; // <-- Admin routes
 import User from './models/user.model.js';  // User model from admin
import { connectDB } from "./lib/Db.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/api/verification", verificationRoutes);

// ✅ Serve uploaded files
app.use('/uploads', express.static('uploads'));

// ✅ API Routes
app.use("/api/auth", authRoutes); // Auth (login/signup)
app.use("/api/verification", verificationRoutes); // Admin verification

// ✅ Extra admin routes from your admin server
app.post('/api/test-create-user', async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = new User({
      name,
      email,
      balance, 
    });

    await user.save();
    res.status(200).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/users/:id/balance', async (req, res) => {
  try {
    const { balance } = req.body;
    const { id } = req.params;

    if (balance === undefined) {
      return res.status(400).json({ error: 'Balance is required' });
    }

    const user = await User.findByIdAndUpdate(id, { balance }, { new: true });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'Balance updated', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update balance' });
  }
});

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ Start server after DB connects
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("🚀 Server is running on http://localhost:" + PORT);
    });
  } catch (error) {
    console.error("🔥 Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
