import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"; // <-- add this
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/Db.js";

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ✅ Setup CORS middleware BEFORE any routes
app.use(cors({
  origin: "http://localhost:5173", // allow frontend origin
  credentials: true, // allow cookies
}));

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRoutes);

// ✅ Static Frontend for Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ Start Server after DB connects
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
