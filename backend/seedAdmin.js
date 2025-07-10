// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import User from "./models/user.model.js"; // ✅ Adjust path if needed

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from root .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("✅ MONGO_URI:", process.env.MONGO_URI);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Admin seed function
const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gcash.com" });

    if (!existingAdmin) {
      await User.create({
        name: "Super Admin",
        email: "admin@gcash.com",
        password: "Admin123!", // Plaintext — will be hashed by schema
        role: "admin",
      });

      console.log("✅ Admin user created: admin@gcash.com / Admin123!");
    } else {
      console.log("ℹ️ Admin user already exists.");
    }
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  } finally {
    mongoose.disconnect();
  }
};

// Run seed function
createAdminUser();
